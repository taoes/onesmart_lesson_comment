// 当前网页的链接地址
let href_1_1 = window.location.href;

// 一对一评论
let pingKeHref = "/LessonWorks/ErrorCollection/CollectError.aspx";
let localTag = null;
let charArray = ['0', 'A', 'B', 'C', 'D'];
let reasonArray = ['语法问题', '词汇欠缺', '阅读细节', '阅读推断', '策略失当', '记忆问题'];
let lastSaveSubmitBtn, entryTestBtn, lessonExampleTestBtn, lessonTestBtn;

/** chrome 插件特有语法,获取配置完成之后才开始进行操作 */
chrome.runtime.sendMessage('Config', function (response) {
    let config = JSON.parse(response);
    if (href_1_1.indexOf(pingKeHref) !== -1) {
        handleWeb();
        setEventHandle(config)
    }
});

/**
 * 处理网页
 */
function handleWeb() {
    // 上次练习巩固
    lastSaveSubmitBtn = $("#a_lastSave");
    if (isShow(lastSaveSubmitBtn)) {
        lastSaveSubmitBtn.addClass("myButton");
        lastSaveSubmitBtn.addClass("mb-40");
        lastSaveSubmitBtn.after(
            "<a id='lastSaveSubmitBtn' class='btn-save myButton' style='bottom:135px'>自动提交</a>");
    }

    // 进门测试
    entryTestBtn = $("#a_EntryTestSave");
    if (isShow(entryTestBtn)) {
        entryTestBtn.addClass("myButton");
        entryTestBtn.addClass("mb-40");
        entryTestBtn.after(
            "<a id='entryTestBtn' class='btn-save myButton' style='bottom:135px'>自动提交</a>")
    }

    // 本次例题练习
    lessonExampleTestBtn = $("#a_thisSave");
    if (isShow(lessonExampleTestBtn)) {
        lessonExampleTestBtn.addClass("myButton");
        lessonExampleTestBtn.addClass("mb-40");
        lessonExampleTestBtn.after(
            "<a id='lessonExampleTestBtn' class='btn-save myButton' style='bottom:135px'>自动提交</a>")
    }

    // 本堂课堂检测
    lessonTestBtn = $("#a_LessonTestSave");
    if (isShow(lessonTestBtn)) {
        lessonTestBtn.addClass("myButton");
        lessonTestBtn.addClass("mb-40");
        lessonTestBtn.after(
            "<a id='lessonTestBtn' class='btn-save myButton' style='bottom:135px'>自动提交</a>")
    }

    let saveAppraiseBtn = $("#saveAppraiseBtn");
    saveAppraiseBtn.after(
        '<a id="evaluationOfLearningAbilityBtn" class="myButton fixPosition m-40">填充数据</a>')

    // 打印随机错题定位标签
    localTag = $("#sitemap .postion div");
}

/**
 * 为按钮添加事件
 */
function setEventHandle(config) {
    $("#lastSaveSubmitBtn").click(() => {
        handleChooseQuestion(0, lastSaveSubmitBtn)
    });

    $("#entryTestBtn").click(() => {
        handleChooseQuestion(1, entryTestBtn)
    });

    $("#lessonExampleTestBtn").click(() => {
        handleChooseQuestion(2, lessonExampleTestBtn)
    });

    // 课堂检测按钮
    $("#lessonTestBtn").click(() => {
        handleChooseQuestion(3, lessonTestBtn);
    });

    // 课堂评价按钮
    $("#evaluationOfLearningAbilityBtn").click(() => {
        // 选择标签
        let topBtnList = $("div[data-level='level1']");
        for (let topBtn of topBtnList) {
            topBtn.click();
        }

        // 选择标签
        let dataTagIds = [97, 124, 131, 152, 181];
        for (let dataTagId of dataTagIds) {
            $(`p[data-tag-id=${dataTagId}]`)[0].click();
        }

        //选择掌握情况
        $(".section2 input[value='2']").click();
    });

}

/**
 * 处理选择题目

 */
function handleChooseQuestion(className, submitBtn) {

    let questionList = $(`div#JKDiv_${className} div.listitem`);
    let questionListLength = questionList.length;
    let error_count = Math.min(questionListLength / 2, 2);
    if (error_count === undefined || error_count === null) {
        error_count = 3
    }

    // 生成错题序号
    let errQNumber = [];
    for (let i = 0; i < error_count; i++) {
        let random = randomRange(0, questionList.length);
        if (errQNumber.indexOf(random) !== -1) {
            i--;
            continue;
        }
        errQNumber.push(random)
    }

    let localTag = $("#sitemap .postion");
    $("#errQNumber").remove();
    let errNumberStr = errQNumber.sort(((a, b) => a - b)).join(",");
    localTag.append(
        `<p id='eQNumber' style="color: red;">页面题目共：${questionListLength} 题 错题号：${errNumberStr}</p>`);

    for (let index = 0; index < questionListLength; index++) {
        if (errQNumber.indexOf(index) === -1) {
            continue
        }

        let question = questionList[index];
        question.style.border = '2px red solid'
        $(question).find(".wrong input").prop("checked", true);

        // 设定原因
        let reason = reasonArray[randomRange(0, reasonArray.length)];
        $(question).find("select.wrongReason option[value='" + reason + "']").prop(
            "selected", true);

        // 设定学生答案
        let studentAnswer = $(question).find("select.studentAnswer");
        if (studentAnswer.length > 0) {
            // 随机生成学生答案
            let optionLength = $(studentAnswer).find("option").length;
            let scope = randomRange(1, optionLength);
            let randomAnswer = charArray[scope];
            $(studentAnswer).find("option:contains('" + randomAnswer + "')").prop(
                "selected", true);
        }
    }
    // 自动提交
    submitBtn[0].click();
}

/**
 * 生成指定范围的随机整数 [min,max)
 */
function randomRange(min, max) { // min最小值，max最大值
    return Math.floor(Math.random() * (max - min)) + min;
}

/** 检查控件是否显示 */
function isShow(element) {
    return element && element.css('display') !== 'none';
}
