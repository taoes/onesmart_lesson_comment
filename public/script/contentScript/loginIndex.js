// 首页自动跳过脚本
const lessonPlanHref = 'LessonPlan.aspx';


if (window.location.href.indexOf(lessonPlanHref) !== -1) {
    console.warn("欢迎使用OneSmart 辅助备课插件................. V1.0")

    /** chrome 插件特有语法,获取配置完成之后才开始进行操作 */
    chrome.runtime.sendMessage('Config', function (response) {
        let config = JSON.parse(response);

        // 跳过首页按钮，原网页参数命名即为 showCanlender 非手误打错
        let btnArray = $("#showCanlender");
        if (btnArray.length > 0) {
            btnArray[0].click();
        }

        // 使所有按钮均可以点击备课
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = 'let preLessonBtn = $("a[class~=\'btn-bk\']").not(".icon-bkcomplete");for (let i = 0; i < preLessonBtn.length; i++) {bindLessonPlan(preLessonBtn[i])}'
        document.body.appendChild(script);
        console.log("重置所有未备课按钮为可备课状态...........OK!")
    });


}


