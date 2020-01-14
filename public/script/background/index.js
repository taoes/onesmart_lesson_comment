// 监听Chrome的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'Config') {
        let config = localStorage.getItem('config');
        if (!config) {
            config = '{}'
        }
        console.log("配置信息" + config);
        sendResponse(config);
    }
    return true;
});

