// 监听Chrome的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'Config') {
        let config = localStorage.getItem('config');
        if (!config) {
            config = '{}'
        }
        sendResponse(config);
    }
    return true;
});

