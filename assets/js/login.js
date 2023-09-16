import { User } from '../api';
import axios from "axios";
const { VITE_BASEURL } = import.meta.env
import Swal from 'sweetalert2';

const forget = document.querySelector("#forget-btn");
const back = document.querySelector("#back-btn");
const forms = document.querySelectorAll('.needs-validation');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const forgetForm = document.querySelector('.forget-form');
const logoutBtn = document.querySelectorAll(".logout-btn");
const loginEmail = document.getElementById('login-email');
const loginPwd = document.getElementById('login-password');
const registerEmail = document.getElementById('register-email');
const registerNickname = document.getElementById('register-nickname');
const registerPwd = document.getElementById('register-password');
const verifyEmail = document.getElementById('verify-email');
const loginTab = document.getElementById("login-tab");

// 登入註冊modal
document.addEventListener("DOMContentLoaded", function () {
    let logout;

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
            nickName: registerForm['register-nickname'].value,
            password: registerForm['register-password'].value,
            avatars: [],
            avatarId: 4,
            totalCheckIn: 0,
            checkInTimer: 0,
            isAdmin: false,
        }

        User.register(data)
            .then(res => {
                // 註冊成功後續處理
                Swal.fire({
                    scrollbarPadding: false,
                    icon: 'success',
                    title: "註冊成功"
                })
                    .then((result) => {
                        if (result.isDismissed || result.isConfirmed) {
                            registerForm.classList.remove('was-validated');
                            registerForm.reset();
                            loginTab.click();
                        }
                    })
                return res.data;
            })
            .catch(err => {
                Swal.fire({
                    scrollbarPadding: false,
                    icon: 'error',
                    title: "註冊失敗",
                    text: '帳號或密碼有誤，請輸入正確資訊'
                }).then((result) => {
                    if (result.isDismissed || result.isConfirmed) {
                        registerForm.classList.remove('was-validated');
                        registerForm.reset();
                    }
                })
                // console.log(err);
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
                return res.data;
            })
            .catch(err => {
                // 登入失敗後續處理
                // 情況例如: 帳號密碼不正確
                Swal.fire({
                    scrollbarPadding: false,
                    icon: "error",
                    title: "此帳號不存在或帳號密碼錯誤"
                });
                // console.log(err);
            })
    })
    // 登出
    logoutBtn.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault()
            validation()
            // 彈出是否登出視窗
            const confirmation = await Swal.fire({
                scrollbarPadding: false,
                icon: 'question',
                title: '確定要登出嗎',
                showCancelButton: true,
            });
            if (confirmation.isConfirmed) {
                // 登出成功視窗
                Swal.fire({
                    scrollbarPadding: false,
                    icon: 'success',
                    title: '登出成功',
                    text: '將跳回首頁',
                }).then((result) => {
                    logout = User.clearUserInfo();
                    location.href = 'index.html'
                });
            }
        })
    });

    //忘記密碼
    forgetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        validation();
        const email = forgetForm['verify-email'].value.trim();

        // 發送請求以查找用戶
        if (isEmail(email)) {
            // 發送請求以查找用戶
            getUserByEmail(email)
                .then(async (user) => {
                    if (user) {
                        console.log(`用戶的 email 為：${user.email}`);
                        const swal = await Swal.fire({
                            scrollbarPadding: false,
                            icon: 'success',
                            title: '已寄送重設密碼連結',
                            showConfirmButton: false, // 隱藏確認按鈕
                            timer: 1500, // 過多少毫秒後消失
                        });
                        if (swal.isDismissed || swal.isConfirmed) {
                            // 這邊判斷 swal 彈窗消失 or 點擊確認按鈕後才會往下繼續的行為
                            // 這樣就不會彈窗還沒看到就立刻換頁
                            location.href = 'reset_password.html';
                        }
                    } else {
                        Swal.fire({
                            scrollbarPadding: false,
                            icon: 'error',
                            title: '查無此帳號'
                        });
                    }
                })
                .catch((err) => {
                    console.log('查找用戶時發生錯誤', err);
                });
        } else {
            // 如果電子郵件地址無效，顯示錯誤消息
            Swal.fire({
                scrollbarPadding: false,
                icon: 'error',
                title: '請輸入有效的電子郵件地址'
            });
        }
    });
});

async function getUserByEmail(email) {
    try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;

        // 1. 這邊找到指定 email 的用戶
        const res = await axios.get(`${VITE_BASEURL}/users?email=${email}`);
        // 2. 這個方式的回傳是一個陣列, 如果找不到會回傳 []
        return res.data[0];
        // if (res.data) {
        // } else {
        //     console.log('找不到用戶資料');
        //     return null;
        // }
    } catch (err) {
        // console.log(err);
        return null;
    }
}


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
        setErrorFor(registerNickname, '暱稱不得為空');
    } else {
        setSuccessFor(registerNickname);
    }

    if (registerPwdValue === '') {
        setErrorFor(registerPwd, '密碼不得為空');
    } else if (registerPwdValue.length < 6) {
        setErrorFor(registerPwd, '密碼至少需要6個字元');
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
    return;
}

function setErrorFor(input, message) {
    const formFloating = input.parentElement;
    const errTxt = formFloating.querySelector('.invalid-feedback');
    errTxt.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}