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
 * 为某个对象添加一个事件函数，兼容写法
 * @param {*对象} obj 
 * @param {*事件} sEvent 
 * @param {*执行函数} fn 
 */

function myAddEvent(obj, sEvent, fn) {
    if (obj.attachEvent) // 兼容IE11之前版本和某些其他浏览器
    {
        obj.attachEvent('on' + sEvent, function() {
            fn.call(obj);
        });
    } else {
        obj.addEventListener(sEvent, fn, false);
    }
}

/**
 * 导航部分
 */
(function() {
    var NavContainer = document.getElementById('nav_container');
    var oSearchIn = document.getElementById('search_in');
    var oSearchCon = document.getElementById('search_container');
    var oSearch = document.getElementById('search');
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
    var isSearch = false;

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
        oSearchCon.style.display = "none";
    }
    Person.onmousedown = function(ev) {
        var oEvent = ev || event;
        oEvent.cancelBubble = true;
        PersonContent.style.display = "block";
    }
    Cancle.onmousedown = function() {
        PersonContent.style.display = "none";
        Person.style.display = "none";
        sign[0].style.display = "block";
        sign[1].style.display = "block";
        oSearchCon.style.display = "block";
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

    // 往document添加点击事件
    myAddEvent(document, "mousedown", function() {
        // 注册登入时的提示框
        PromptUp.style.display = "none";
        PromptIn.style.display = "none";
        // 个人部分消失
        PersonContent.style.display = "none";
    });

    // 点击搜索框时的事件
    oSearch.onmousedown = oSearchIn.onmousedown = function(ev) {
        var oEvent = ev || event;
        oEvent.cancelBubble = true;
        oSearch.style.cssText = "filter: Alpha(opacity=100);opacity: 1;padding: 0 30px 0 10px;width: 150px;";
        isSearch = true;
    }

    NavContainer.onmousedown = function() {
        oSearch.style.cssText = "filter: Alpha(opacity=0);opacity: 0;padding: 0;width: 0;";
        isSearch = false;
    }

})();