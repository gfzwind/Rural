// 王编辑器部分（输入框）

(function() {
    var E = window.wangEditor;
    var editor = new E('#wang_editor');
    var InputAsk = document.getElementById("comments_input");
    var InputTrue = document.getElementById("editor_true");
    var InputReturn = document.getElementById("editor_return");
    // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
    editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    // editor.customConfig.uploadImgServer = '/upload'; // 上传图片到服务器
    editor.create();

    // 我要提问按钮点击效果
    InputAsk.onmousedown = function() {
        var $wangEditor = $("#wang_editor");
        var $editorInput = $("#editor_input");
        var WeText = $wangEditor[0].querySelector(".w-e-text");
        var isFirst = true;
        $wangEditor.show();
        $editorInput.show();
        WeText.innerHTML = '请文明评论';
        WeText.onmousedown = function() {
            if (isFirst) {
                WeText.innerHTML = "";
                isFirst = false;
            }
        };
    }

    // 评论按钮点击效果
    InputTrue.onmousedown = function() {
        $("#wang_editor").hide();
        $("#editor_input").hide();
        $("#value").show();
    }

    // 返回按钮点击效果
    InputReturn.onmousedown = function() {
        $("#wang_editor").hide();
        $("#editor_input").hide();
        $("#value").show();
    }
})();

// 排序按钮
(function() {
    var TimeInput = document.getElementById("comments_time");
    var TimeHot = document.getElementById("comments_hot");

    // 时间按钮点击效果
    TimeInput.onmousedown = function() {
        TimeInput.className = "comments_btn btn btn-info";
        TimeHot.className = "comments_btn btn btn-default";
    }

    // 热度排序按钮点击效果
    TimeHot.onmousedown = function() {
        TimeHot.className = "comments_btn btn btn-info";
        TimeInput.className = "comments_btn btn btn-default";
    }
})();