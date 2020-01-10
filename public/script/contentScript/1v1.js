// 当前网页的链接地址
let href = window.location.href;


// 一对一评论
let pingKeHref = "/LessonWorks/ErrorCollection/CollectError.aspx";
let localTag = null;
let charArray = ['0', 'A', 'B', 'C', 'D'];
let reasonArray = ['语法问题', '词汇欠缺', '阅读细节', '阅读推断', '策略失当', '记忆问题'];
let lastSaveSubmitBtn, entryTestBtn, lessonExampleTestBtn, lessonTestBtn;
let configs = undefined;


/** chrome 插件特有语法,获取配置完成之后才开始进行操作 */
chrome.runtime.sendMessage('Config', function (response) {
    this.configs = JSON.parse(response);
    console.log(`获取到配置信息:${parse}`);
    if (href.indexOf(pingKeHref) !== -1) {
        handleWeb();
        setEventHandle()
    }
});


/**
 * 处理网页
 */
function handleWeb() {
    // 上次练习巩固
    lastSaveSubmitBtn = $("#a_lastSave");
    if (isShow(lastSaveSubmitBtn)) {
        lastSaveSubmitBtn.after("<a id=\"lastSaveSubmitBtn\" class=\"btn-save\" style=\"bottom:135px\">随机选题</a>");
    }

    // 进门测试
    entryTestBtn = $("#a_EntryTestSave");
    if (isShow(entryTestBtn)) {
        entryTestBtn.after("<a id=\"entryTestBtn\" class=\"btn-save\" style=\"bottom:135px\">随机选题</a>")
    }

    // 本次例题练习
    lessonExampleTestBtn = $("#a_thisSave");
    if (isShow(lessonExampleTestBtn)) {
        lessonExampleTestBtn.after("<a id=\"lessonExampleTestBtn\" class=\"btn-save\" style=\"bottom:135px\">随机选题</a>")
    }

    // 本堂课堂检测
    lessonTestBtn = $("#a_LessonTestSave");
    if (isShow(lessonTestBtn)) {
        lessonTestBtn.after("<a id=\"lessonTestBtn\" class=\"btn-save\" style=\"bottom:135px\">随机选题</a>")
    }


    // 打印随机错题定位标签
    localTag = $("#sitemap .postion div");
}


/**
 * 为按钮添加事件
 */
function setEventHandle() {
    $("#lastSaveSubmitBtn").click(function () {
        handleChooseQuestion('JKDiv_0')

    });

    $("#entryTestBtn").click(function () {
        handleChooseQuestion('JKDiv_1')
    });

    $("#lessonExampleTestBtn").click(function () {
        handleChooseQuestion('JKDiv_2')
    });

    $("#lessonTestBtn").click(function () {
        handleChooseQuestion('JKDiv_3');
    });

    let saveAppraiseBtn = $("#saveAppraiseBtn");
    saveAppraiseBtn.after("<a id=\"saveAppraiseBtn2\" href=\"javascript:void(0);\" style=\"margin-left:10px;\">随机填充</a>")
    $("#saveAppraiseBtn2").click(function () {
        handleStateQuestion(1);
    });


    $("#paiseTab").bind('click', function () {
        let saveAppraiseBtn = $("#saveAppraiseBtn");
        saveAppraiseBtn.after("<a id=\"saveAppraiseBtn2\" href=\"javascript:void(0);\" style=\"margin-left:10px;\">随机填充</a>")
        $("#saveAppraiseBtn2").click(function () {
            handleStateQuestion(1);
        });
    })
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


    $("#scores2").click();
    $("textarea.remarktt").val(comment);

}


/**
 * 处理选择题目
 * @param className
 */
function handleChooseQuestion(className) {

    let questionList = $(`div#${className} div.listitem`);
    let error_count = localStorage.getItem('error_count');
    if (error_count === undefined || error_count === null) {
        error_count = 3
    }

    // 生成错题序号
    let errorQuestionNumber = [];
    for (let i = 0; i < error_count; i++) {
        let random = randomRange(0, questionList.length);
        if (errorQuestionNumber.indexOf(random) !== -1) {
            i--;
            continue;
        }
        errorQuestionNumber.push(random)
    }

    let localTag = $("#sitemap .postion");
    $("#errorQuestionNumber").remove();
    localTag.append(`<p id='errorQuestionNumber' style='color: red;font-size: 300%;margin-top: 10px;margin-bottom: 10px'>
            本页面题目共：${questionList.length} 题  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            当前选择错题：${errorQuestionNumber.sort(((a, b) => a - b)).join(",")}
 </p>`);

    for (let index = 0; index < questionList.length; index++) {
        if (errorQuestionNumber.indexOf(index) === -1) {
            continue
        }

        let question = questionList[index];

        question.style.border = '5px red solid'

        $(question).find(".wrong input").prop("checked", true);

        // 设定原因
        let reason = reasonArray[randomRange(0, reasonArray.length)];
        $(question).find("select.wrongReason option[value='" + reason + "']").prop("selected", true);

        // 设定学生答案
        let studentAnswer = $(question).find("select.studentAnswer");
        if (studentAnswer.length > 0) {
            // 随机生成学生答案
            let optionLength = $(studentAnswer).find("option").length;
            let scope = randomRange(1, optionLength);
            let randomAnswer = charArray[scope];
            $(studentAnswer).find("option:contains('" + randomAnswer + "')").prop("selected", true);
        }

    }

}


/**
 * 生成指定范围的随机整数 [min,max)
 * @param min
 * @param max
 * @returns {*}
 */
function randomRange(min, max) { // min最小值，max最大值
    return Math.floor(Math.random() * (max - min)) + min;
}


/** 检查控件是否显示 */
function isShow(element) {
    return element && element.css('display') !== 'none';
}
