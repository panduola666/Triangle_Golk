
// 5秒後顯示聊天區域
setTimeout(function() {
    document.getElementById("chat-box__wraper").style.display = "block";

    // 將歡迎消息隱藏
    document.querySelector(".chat-box-welcome__header").style.display = "none";
}, 5000);

