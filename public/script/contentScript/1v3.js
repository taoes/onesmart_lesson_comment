let href_1_3 = window.location.href;
let one2three = "Lessons/AddLessonAppraise1V3.aspx";

const comment = '建议做完练习后对错题进行总结归纳；课堂上比较积极，能够及时提出自己疑惑并在引导下积极思考解决问题。就是检查了前面两次课的内容，学生有部分遗忘的情况，希望及时复习已学知识点';

chrome.runtime.sendMessage('Config', (response) => {
  console.debug("获取到的配置信息为" + response);
  const config = JSON.parse(response);
  if (href_1_3.indexOf(one2three) !== -1) {
    one2threePK(config);
  }
});

/** 1对3评课 */
function one2threePK(config) {
  $(".btn-big-blue").after(
      "<a id='allManFen' class='btn-big-blue' style='right:135px'>全部满分</a>");
  $('#allManFen').click(() => {
        handleStateQuestion(config, 3);
      }
  )
  ;
}

/**
 * 处理评级控件
 * @param className
 */
function handleStateQuestion(config, className) {
  $("div.description").html('5分');
  let starList = $(`.main tbody a[title='5']`);
  for (let i = 0; i < starList.length; i++) {
    starList[i].click();
  }

  $("input.scoreRadio[name='scores1'][value='2']").click();
  $("textarea#remark").val(comment);
}
