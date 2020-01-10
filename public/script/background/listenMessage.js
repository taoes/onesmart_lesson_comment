// 监听Chrome的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message === 'congfig') {
        const config = localStorage.getItem('config');
        sendResponse(config);
    }
    return true;
});

