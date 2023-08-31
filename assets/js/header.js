// 登入註冊modal
document.addEventListener("DOMContentLoaded", function () {
    const forget = document.querySelector("#forget-btn");
    const back = document.querySelector("#back-btn");

    forget.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("switch");
    });
    back.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("switch");
    });
});
