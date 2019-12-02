chrome.contextMenus.create({
    title: '使用比一比：%s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function(params)
    {

        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'http://www.b1bj.com/s.aspx?ac=t&key=' + encodeURI(params.selectionText)});
    }
});

var port = chrome.runtime.connectNative('com.jk1123.chromecx');

port.onMessage.addListener(function(msg) {
    alert(msg.text)
});
port.onDisconnect.addListener(function() {
    console.log("Disconnected");
});
chrome.contextMenus.create({
    title: "查看比价信息",
    onclick: function(){
        port.postMessage({ text: "Hello" });
    }
});
chrome.runtime.sendNativeMessage('com.jk1123.chromecx',
    {"text":"你好啊啊实打实大所大所大所大所大所多"},
    function(response) {
        console.log("Received " + response.text);
    });

