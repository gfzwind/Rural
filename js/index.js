/**
 * global function
 */
// 获取元素的样式
function getStyle(obj, attr) {
    var od = obj.currentStyle || getComputedStyle(obj, false);
    return od[attr];
}
// 去掉字符串的首尾空格
function trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 导航部分
 */
(function() {
    var oSearchIn = document.getElementById('search_in');
    var oSearchOut = document.getElementById('search_out');
    var oSearchCon = document.getElementById('search_container');
    var PromptUp = document.getElementById('prompt_up');
    var PromptIn = document.getElementById('prompt_in');
    var UpTrue = document.getElementById('signup_true'); // 登入按钮
    var InTrue = document.getElementById('signin_true'); // 注册按钮
    var TextIn = document.getElementById('text'); // 登入用户名文本框
    var PasswordIn = document.getElementById('password'); // 登入密码框
    var TextUp = document.getElementById('text_up'); // 注册用户名文本框
    var PasswordUp = document.getElementById('password_up'); // 注册密码框
    var PasswordAgain = document.getElementById('password_again'); // 再次确认按钮
    var sign = document.querySelector("#sign_container").querySelectorAll("a");
    var Person = document.getElementById('person');
    var PersonContent = document.getElementById('person_content');
    var Cancle = document.getElementById('cancle');
    // 点击登入按钮时的事件
    InTrue.onmousedown = function(ev) {
        var oEvent = ev || event;
        var TextWord = trim(TextIn.value); // trim(s)去掉字符串的首尾空格并返回
        var PassWord = trim(PasswordIn.value);

        oEvent.cancelBubble = true;
        // 登入框消失
        $('#signin_modal').modal('hide');
        // 登入和注册两个按钮消失，头像和姓名出现
        sign[0].style.display = "none";
        sign[1].style.display = "none";
        Person.style.display = "block";
        // 消除一个关于PersonContent的bug
        PersonContent.style.display = "none";
        // 失败时的提示框
        // 根据问题的原因不同显示不同的登入信息，例子如下
        // PromptIn.style.display = "block";
        // PromptIn.innerText = "您输入有误";
    }
    Person.onmousedown = function() {
        PersonContent.style.display = "block";
    }
    Cancle.onmousedown = function() {
        PersonContent.style.display = "none";
        Person.style.display = "none";
        sign[0].style.display = "block";
        sign[1].style.display = "block";
    }

    // 点击注册按钮时的事件
    UpTrue.onmousedown = function(ev) {
        var oEvent = ev || event;
        var TextWord = trim(TextUp.value);
        var PassWord = trim(PasswordUp.value);
        var PassWordAgain = trim(PasswordAgain.value);

        oEvent.cancelBubble = true;
        // if (PassWord != PassWordAgain) {
        //     PromptUp.innerHTML = "两次密码输入不同";
        //     PromptUp.style.display = "block";
        // }

        // 登入框消失
        $('#signup_modal').modal('hide');
    }
    document.onmousedown = function() {
        PromptUp.style.display = "none";
        PromptIn.style.display = "none";
    }
})();

/**
 *  头部的轮播部分
 */
(function() {
    var oSlideUl = document.getElementById('slide_header');
    var oSlideLi = oSlideUl.getElementsByTagName('li');
    var iNow = 0,
        iOld = 0;

    setInterval(function() {
        iNow = ++iNow % 2;
        slideOpacity(oSlideLi[iOld], oSlideLi[iNow]);
        iOld = iNow;
    }, 4000);
    //  变化透明度  最好和css3一起用
    function slideOpacity(objOld, objNow) {
        objOld.style.opacity = "0";
        objNow.style.opacity = "1";
        objOld.style.filter = 'Alpha(opacity:0)';
        objNow.style.filter = 'Alpha(opacity:100)';
    }
})();

/**
 * 新闻部分
 */
(function() {
    // ajax写这里面
})();