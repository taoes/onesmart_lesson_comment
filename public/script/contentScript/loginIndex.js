// 首页自动跳过脚本
const lessonPlanHref = 'LessonPlan.aspx';


if (window.location.href.indexOf(lessonPlanHref) !== -1) {
    console.debug("进入首页,准备点击首页按钮");
    /** chrome 插件特有语法,获取配置完成之后才开始进行操作 */
    chrome.runtime.sendMessage('Config', function (response) {
        let config = JSON.parse(response);
        // 原网页参数命名即为 showCanlender 非手误打错
        let btnArray = $("#showCanlender");
        if (!config.skipIndex) {
            console.debug("未发现配置或者未跳过首页");
            return;
        }
        console.debug(btnArray.length);
        if (btnArray !== undefined && btnArray.length > 0) {
            btnArray[0].click();
            console.debug("跳过首页按钮完成")
        }
    });
}


