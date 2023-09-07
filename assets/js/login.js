import { User } from '../api';
import Swal from 'sweetalert2';


const forget = document.querySelector("#forget-btn");
const back = document.querySelector("#back-btn");
const forms = document.querySelectorAll('.needs-validation');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const logoutBtn = document.querySelector("#logout-btn");
const loginEmail = document.getElementById('login-email');
const loginPwd = document.getElementById('login-password');
const registerEmail = document.getElementById('register-email');
const registerNickname = document.getElementById('register-nickname');
const registerPwd = document.getElementById('register-password');
const verifyEmail = document.getElementById('verify-email');

// 登入註冊modal
document.addEventListener("DOMContentLoaded", function () {
    let logout;
    let reLogin;

    forget.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("switch");
    });
    back.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.toggle("switch");
    });

    // 註冊
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        // 表單驗證
        validation()

        const data = {
            email: registerForm['register-email'].value,
            // nickName: registerForm['register-nickName'].value,
            password: registerForm['register-password'].value
        }
        User.register(data)
            .then(res => {
                // 註冊成功後續處理
                Swal.fire({
                    icon: 'success',
                    title: "註冊成功"
                });
                console.log(res);
                return res.data;
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: "註冊失敗"
                });
                console.log(res);
                // 註冊失敗後續處理
                // 情況例如: 帳號密碼不正確
                console.log(err);
            });
    });


    // 登入
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        // 還缺少表單驗證, 目前先串好登入資料供後續人使用
        validation()
        const data = {
            email: loginForm['login-email'].value,
            password: loginForm['login-password'].value
        }
        User.login(data)
            .then(res => {
                // 登入成功後續處理
                Swal.fire({
                    icon: 'success',
                    title: "登入成功"
                });
                console.log(res);
                return res.data;
            })
            .catch(err => {
                // 登入失敗後續處理
                // 情況例如: 帳號密碼不正確
                Swal.fire({
                    icon: "error",
                    title: "此帳號不存在或帳號密碼錯誤"
                });
                console.log(err);
                return err.data;
            })
    })
    // 登出
    logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        validation()
        // 彈出是否登出視窗
        const confirmation = await Swal.fire({
            icon: 'question',
            title: '確定要登出嗎',
            showCancelButton: true,
        });

        if (confirmation.isConfirmed) {
            // 登出成功視窗
            Swal.fire({
                icon: 'success',
                title: '登出成功',
                text: '將跳回首頁',
            }).then((result) => {
                logout = User.clearUserInfo();
                reLogin = User.plsReLogin();
            });
        }
    })
});



forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.classList.add('was-validated');
        validation();
    });
});

function validation() {
    const loginEmailValue = loginEmail.value.trim();
    const loginPwdValue = loginPwd.value.trim();
    const registerEmailValue = registerEmail.value.trim();
    const registerNicknameValue = registerNickname.value.trim();
    const registerPwdValue = registerPwd.value.trim();
    const verifyEmailValue = verifyEmail.value.trim();

    if (loginEmailValue === '') {
        setErrorFor(loginEmail, '信箱不得為空');
    } else if (!isEmail(loginEmailValue)) {
        setErrorFor(loginEmail, '信箱格式不正確');
    } else {
        setSuccessFor(loginEmail);
    }

    if (loginPwdValue === '') {
        setErrorFor(loginPwd, '密碼不得為空');
    } else {
        setSuccessFor(loginPwd);
    }

    if (registerEmailValue === '') {
        setErrorFor(registerEmail, '信箱不得為空');
    } else if (!isEmail(registerEmailValue)) {
        setErrorFor(registerEmail, '信箱格式不正確');
    } else {
        setSuccessFor(registerEmail);
    }

    if (registerNicknameValue === '') {
        setErrorFor(registerNickname, '密碼不得為空');
    } else {
        setSuccessFor(registerNickname);
    }

    if (registerPwdValue === '') {
        setErrorFor(registerPwd, '密碼不得為空');
    } else {
        setSuccessFor(registerPwd);
    }

    if (verifyEmailValue === '') {
        setErrorFor(verifyEmail, '信箱不得為空');
    } else if (!isEmail(verifyEmailValue)) {
        setErrorFor(verifyEmail, '信箱格式不正確');
    } else {
        setSuccessFor(verifyEmail);
    }
}

function setErrorFor(input, message) {
    const formFloating = input.parentElement;
    const errTxt = formFloating.querySelector('.invalid-feedback');
    errTxt.innerText = message;
}
function setSuccessFor(input) {
    const formFloating = input.parentElement;
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}