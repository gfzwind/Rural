var StringUtil = (function () {
    function StringUtil() {
    }
    StringUtil.htmlEncode = function (str) {
        var s = '';
        if (str.length == 0)
            return '';
        s = str.replace(/&/g, '&gt;');
        s = s.replace(/</g, '&lt;');
        s = s.replace(/>/g, '&gt;');
        s = s.replace(/ /g, '&nbsp;');
        s = s.replace(/\'/g, '&#39;');
        s = s.replace(/\"/g, '&quot;');
        s = s.replace(/\n/g, '<br>');
        return s;
    };
    StringUtil.htmlDecode = function (str) {
        var s = '';
        if (str.length == 0)
            return '';
        s = str.replace(/&amp;/g, '&');
        s = s.replace(/&lt;/g, '<');
        s = s.replace(/&gt;/g, '>');
        s = s.replace(/&nbsp;/g, ' ');
        s = s.replace(/&#39;/g, '\'');
        s = s.replace(/&quot;/g, '\'');
        return s;
    };
    StringUtil.isEmptyOrNull = function (str) {
        if (str == "" || str == null)
            return true;
        return false;
    };
    StringUtil.getDoubleQuoteString = function (str) {
        var reg = /\"(.*)\"/;
        var resArr = reg.exec(str);
        if (resArr) {
            str = resArr[1];
        }
        return str;
    };
    StringUtil.getLastSlashContent = function (str) {
        var index = str.lastIndexOf("\/");
        return str.substring(index + 1, str.length);
    };
    StringUtil.isHasClass = function (e, c) {
        if (StringUtil.isEmptyOrNull(c) || !e)
            return false;
        return new RegExp(" " + c + " ").test(" " + e.className + " ");
    };
    StringUtil.addClass = function (e, c) {
        if (!StringUtil.isHasClass(e, c)) {
            e.className = StringUtil.isEmptyOrNull(e.className) ? c : e.className + " " + c;
        }
    };
    StringUtil.removeClass = function (e, c) {
        if (StringUtil.isHasClass(e, c)) {
            var newClass = " " + e.className.replace(/\f\n\r\t\v/g, "") + " ";
            while (newClass.indexOf(" " + c + " ") >= 0) {
                newClass = newClass.replace(" " + c + " ", " ");
            }
            e.className = newClass;
        }
    };
    return StringUtil;
}());
var DateUtil = (function () {
    function DateUtil() {
    }
    DateUtil.dateFormat = function (time) {
        var dt = new Date(time);
        return dt.getFullYear() + '年' + (dt.getMonth() + 1) + '月' + dt.getDate() + '日' + DateUtil.toDouble(dt.getHours()) + ':' + DateUtil.toDouble(dt.getMinutes()) + ':' + DateUtil.toDouble(dt.getSeconds());
    };
    DateUtil.toDouble = function (num) {
        if (num < 10)
            return '0' + num;
        else
            return '' + num;
    };
    DateUtil.getDateDiff = function (time) {
        return "dt";
    };
    return DateUtil;
}());
var CookieUtil = (function () {
    function CookieUtil() {
    }
    CookieUtil.set = function (name, value, expires, domain, path, secure) {
        var cookieText = "";
        cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toUTCString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    };
    CookieUtil.get = function (name) {
        var cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie.indexOf(cookieName), cookieValue = "";
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    };
    CookieUtil.unset = function (name, domain, path, secure) {
        this.set(name, "", new Date(), domain, path, secure);
    };
    return CookieUtil;
}());
var Pageable = (function () {
    function Pageable(totalPages, visiblePages, nowPage, parentElement) {
        this.firstTemplate = "\n    <a href=\"javascript:;\" class=\"" + PageableClassEnum[6] + " " + PageableClassEnum[0] + "\">\u9996\u9875</a>\n    <a href=\"javascript:;\" class=\"" + PageableClassEnum[6] + " " + PageableClassEnum[1] + "\">\u4E0A\u4E00\u9875</a>\n    ";
        this.endTemplate = "\n    <a href=\"javascript:;\" class=\"" + PageableClassEnum[6] + " " + PageableClassEnum[4] + "\">\u4E0B\u4E00\u9875</a>\n    <a href=\"javascript:;\" class=\"" + PageableClassEnum[6] + " " + PageableClassEnum[5] + "\">\u672B\u9875</a>\n    ";
        this.totalPages = totalPages;
        this.visiblePages = visiblePages;
        this.nowPage = nowPage;
        this.parentElement = parentElement;
    }
    Pageable.prototype.create = function () {
        var _this = this;
        this.parentElement.innerHTML = this.firstTemplate;
        var startPage = this.nowPage - Math.floor(this.visiblePages / 2);
        if (startPage > 1) {
            this.parentElement.appendChild(this.createEllipsisTemplate());
        }
        else {
            startPage = 1;
        }
        var endPage = startPage + this.visiblePages - 1;
        var isShowFinish = (endPage >= this.totalPages);
        if (isShowFinish) {
            endPage = this.totalPages;
        }
        for (var i = startPage; i <= endPage; i++) {
            var item = this.createPageNumTemplate(i);
            if (i == this.nowPage) {
                StringUtil.addClass(item, PageableClassEnum[8]);
            }
            this.parentElement.appendChild(item);
        }
        if (!isShowFinish) {
            this.parentElement.appendChild(this.createEllipsisTemplate());
        }
        this.parentElement.innerHTML += this.endTemplate;
        if (this.nowPage == 1) {
            StringUtil.addClass(document.getElementsByClassName(PageableClassEnum[0]).item(0), PageableClassEnum[7]);
            StringUtil.addClass(document.getElementsByClassName(PageableClassEnum[1]).item(0), PageableClassEnum[7]);
        }
        else if (this.nowPage == this.totalPages) {
            StringUtil.addClass(document.getElementsByClassName(PageableClassEnum[5]).item(0), PageableClassEnum[7]);
            StringUtil.addClass(document.getElementsByClassName(PageableClassEnum[4]).item(0), PageableClassEnum[7]);
        }
        var items = this.parentElement.getElementsByClassName(PageableClassEnum[6]);
        var _loop_1 = function (i) {
            var item = items.item(i);
            if (!StringUtil.isHasClass(item, PageableClassEnum[2]) && !StringUtil.isHasClass(item, PageableClassEnum[7]) && !StringUtil.isHasClass(item, PageableClassEnum[8])) {
                item.addEventListener("click", function () { return _this.onClick(item); });
            }
        };
        for (var i = 0; i < items.length; i++) {
            _loop_1(i);
        }
    };
    Pageable.prototype.createTemplate = function () {
        var item = document.createElement("a");
        StringUtil.addClass(item, PageableClassEnum[6]);
        item.href = "javascript:;";
        return item;
    };
    Pageable.prototype.createEllipsisTemplate = function () {
        var item = this.createTemplate();
        item.innerHTML = "...";
        StringUtil.addClass(item, PageableClassEnum[2]);
        return item;
    };
    Pageable.prototype.createPageNumTemplate = function (num) {
        var item = this.createTemplate();
        item.innerHTML = num.toString();
        StringUtil.addClass(item, PageableClassEnum[3]);
        return item;
    };
    Pageable.prototype.onClick = function (e) {
        var _i;
        for (var i = 0; i <= PageableClassEnum["pageable-end"]; i++) {
            if (StringUtil.isHasClass(e, PageableClassEnum[i])) {
                _i = i;
                break;
            }
        }
        switch (_i) {
            case 0:
                this.changePageNum(1);
                break;
            case 1:
                this.changePageNum(this.nowPage - 1);
                break;
            case 2:
                break;
            case 3:
                this.changePageNum(parseInt(e.innerHTML));
                break;
            case 4:
                this.changePageNum(this.nowPage + 1);
                break;
            case 5:
                this.changePageNum(this.totalPages);
                break;
            default:
                return;
        }
    };
    Pageable.prototype.pageChange = function () {
    };
    Pageable.prototype.changePageNum = function (num) {
        this.nowPage = num;
        this.pageChange();
        this.create();
    };
    return Pageable;
}());
var PageableClassEnum;
(function (PageableClassEnum) {
    PageableClassEnum[PageableClassEnum["pageable-first"] = 0] = "pageable-first";
    PageableClassEnum[PageableClassEnum["pageable-previous"] = 1] = "pageable-previous";
    PageableClassEnum[PageableClassEnum["pageable-ellipsis"] = 2] = "pageable-ellipsis";
    PageableClassEnum[PageableClassEnum["pageable-num"] = 3] = "pageable-num";
    PageableClassEnum[PageableClassEnum["pageable-next"] = 4] = "pageable-next";
    PageableClassEnum[PageableClassEnum["pageable-end"] = 5] = "pageable-end";
    PageableClassEnum[PageableClassEnum["pageable-item"] = 6] = "pageable-item";
    PageableClassEnum[PageableClassEnum["pageable-disable"] = 7] = "pageable-disable";
    PageableClassEnum[PageableClassEnum["pageable-active"] = 8] = "pageable-active";
})(PageableClassEnum || (PageableClassEnum = {}));
