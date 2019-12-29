// 当前网页的链接地址
let hrefw = window.location.href;


// 一对三评论
let one2three = "Lessons/AddLessonAppraise1V3.aspx";


if (hrefw.indexOf(one2three) !== -1) {
    one2threePK();
}


/** 1对3评课 */
function one2threePK() {
    $(".btn-big-blue").after("<a id=\"allManFen\" class=\"btn-big-blue\" style=\"right:135px\">全部满分</a>");
    $("#allManFen").click(function () {
        handleStateQuestion(3);
    });
}


/**
 * 处理评级控件
 * @param className
 */
function handleStateQuestion(className) {
    $("div.description").html('5分');
    let fiveStars = $("a.five-stars");
    for (let i = 0; i < fiveStars.length; i++) {
        fiveStars[i].click();
    }
    // 文本
    let comment = '建议做完练习后对错题进行总结归纳；课堂上比较积极，能够及时提出自己疑惑并在引导下积极思考解决问题。就是检查了前面两次课的内容，学生有部分遗忘的情况，希望及时复习已学知识点';
    $("input.scoreRadio[value='2']").click();
    $("textarea#remark").val(comment);
}
