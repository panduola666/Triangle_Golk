import { User } from '../api';

// 登入註冊modal
document.addEventListener("DOMContentLoaded", function () {
    const forget = document.querySelector("#forget-btn");
    const back = document.querySelector("#back-btn");

    const loginForm = document.querySelector('.login-form')


    forget.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("switch");
    });
    back.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("switch");
    });


    // 登入
    loginForm.addEventListener('submit',async (e) => {
        e.preventDefault()
        // 還缺少表單驗證, 目前先串好登入資料供後續人使用
        const data = {
            email: loginForm['login-email'].value,
            password: loginForm['login-password'].value
        }
       User.login(data)
       .then(res => {
        // 登入成功後續處理
        console.log(res);
       })
       .catch(err => {
        // 登入失敗後續處理
        // 情況例如: 帳號密碼不正確
        console.log(err);
       })
       
    })
});

