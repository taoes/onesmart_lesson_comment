let href_1_3 = window.location.href;
let one2three = "Lessons/AddLessonAppraise1V3.aspx";

let stateKey = {'知道': 1, '理解': 2, '掌握': 3, '运用': 4};
let starKey = ['one-stars', 'two-stars', 'three-stars', 'four-stars', 'five-stars'];

chrome.runtime.sendMessage('Config', (response) => {
    console.debug("获取到的配置信息为" + response);
    const config = JSON.parse(response);
    if (href_1_3.indexOf(one2three) !== -1) {
        one2threePK(config);
    }
});


/** 1对3评课 */
function one2threePK(config) {
    $(".btn-big-blue").after("<a id=\"allManFen\" class=\"btn-big-blue\" style=\"right:135px\">全部满分</a>");
    $("#allManFen").click(function () {
        handleStateQuestion(config, 3);
    });
}


/**
 * 处理评级控件
 * @param className
 */
function handleStateQuestion(config, className) {
    // 文本
    let comment;
    let classState;
    let stars;
    if (!config) {
        stars = 5;
        classState = '理解';
        comment = '建议做完练习后对错题进行总结归纳；课堂上比较积极，能够及时提出自己疑惑并在引导下积极思考解决问题。就是检查了前面两次课的内容，学生有部分遗忘的情况，希望及时复习已学知识点';
    } else {
        stars = starKey[config.defaultRate - 1];
        comment = config.comment;
        classState = stateKey[config.status];
    }

    $("div.description").html('5分');
    let starList = $("a." + stars);
    for (let i = 0; i < starList.length; i++) {
        starList[i].click();
    }

    $("input.scoreRadio[value='" + classState + "']").click();
    $("textarea#remark").val(comment);
}
