
// 5秒後顯示聊天區域
// setTimeout(function() {
//     document.getElementById("chat-box__wraper").style.display = "block";

//     // 將歡迎消息隱藏
//     document.querySelector(".chat-box-welcome__header").style.display = "none";
// }, 5000);



var botController = (function () {
    
})();

var uiController = (function () {
    
})();

var controller = (function (botCntr, uiCntr) {
    var $chatCircle,
        $chatBox,
        $chatBoxClose,
        $chatBoxWelcome,
        $chatWraper,
        $submitBtn,
        $chatInput,
        $msg;

    

    // 處理用戶提交訊息的函數
    function submitMessage() {
        var userMessage = $chatInput.val(); // 獲取用戶輸入的訊息
        // var messageHtml = '<div class="chat-msg self">' +
        //     '<span class="cm-msg-text">' + userMessage + '</span>' +
        //     '</div>';
        // $('.chat-logs').append(messageHtml);
        // $chatInput.val(''); // 清空輸入框

        var messageHtml = '<div class="chat-msg self chat-msg bot">' +
        '<span class="msg-avatar">' +
        '<img class="chat-box-overlay_robot rounded-circle"  src="../assets/images/chat.png" alt="用戶頭像">' +
        '</span>' +
        '<span class="cm-msg-text shadow-sm rounded text-secondary fw-bold bg-light" style="float:left;" >' +
        userMessage +
        '</span>' +
        '</div>';

        // 將用戶發送的訊息 HTML 附加到聊天視窗
        $('.chat-logs').append(messageHtml);

        $chatInput.val(''); // 清空輸入框
}

    // 初始化函數
    function init() {
        $chatCircle = $("#chat-circle");
        $chatBox = $(".chat-box");
        $chatBoxClose = $(".chat-box-toggle");
        $chatBoxWelcome = $(".chat-box-welcome__header");
        $chatWraper = $("#chat-box__wraper");
        $chatInput = $("#chat-input__text");
        $submitBtn = $("#chat-submit");

        // 當用戶按下送出按鈕時觸發
        $submitBtn.on("click", function (e) {
            e.preventDefault();
            submitMessage(); // 呼叫處理用戶輸入的函數
        });

        // 當用戶按下 Enter 鍵時觸發
        $chatInput.on("keypress", function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                submitMessage(); // 呼叫處理用戶輸入的函數
            }
        });
    }

    return {
        init: init
    };

})(botController, uiController);

// 5秒後顯示聊天區域

$(document).ready(controller.init);

   // 將歡迎消息隱藏
setTimeout(function() {
    document.getElementById("chat-box__wraper").style.display = "block";
    document.querySelector(".chat-box-welcome__header").style.display = "none";
}, 5000);
