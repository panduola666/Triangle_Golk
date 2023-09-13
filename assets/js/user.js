import Swiper from "swiper";
import { Avatars, User } from '../api/index'
import axios from "axios";
const { VITE_BASEURL } = import.meta.env

const nickNameInput = document.getElementById('nickName');
const nickName = document.querySelector("#nickName");
const editBtn = document.querySelector("#edit-btn");
const saveBtn = document.querySelector("#save-btn");
const nowPwd = document.querySelector("#now-pwd");
const setNewPwd = document.querySelector("#set-newPwd");
const rePwd = document.querySelector("#re-pwd");
const changePwdForm = document.querySelector("#changePwdForm");
const album = document.querySelector(".album");
const successMessage = document.querySelector('#success-message')

let user;
let avatars;
const userInfo = {
    nickName: '',
    email: ''
};

async function init() {
    try {

        const res = await axios.get(`${VITE_BASEURL}/users`);

        if (res.data && res.data.length > 0) {
            userInfo.nickName = res.data[0].nickName;
            userInfo.email = res.data[0].email;
        } else {
            userInfo.nickName = nickName || '';
            userInfo.email = email || '';
        }

        document.getElementById('nickName').value = userInfo.nickName;
        document.getElementById('email').value = userInfo.email;

        avatars = await Avatars.getTotal();
        user = await User.getUserInfo();
    } catch (err) {
        console.log(err);
    }
}

init();

// 編輯暱稱
editBtn.addEventListener('click', function (e) {
    e.preventDefault()
    nickNameInput.textContent = nickName.value;
    nickNameInput.removeAttribute("readonly");
    editBtn.classList.add("d-none");
    saveBtn.classList.remove("d-none");
    saveBtn.classList.remove("btn-secondary");
    saveBtn.classList.add("btn-outline-secondary");
})
saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    nickNameInput.setAttribute("readonly", true);
    saveBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");
});

//修改頭像
album.addEventListener('click', (e) => {
    const imgs = document.querySelectorAll('.avatar-img')
    imgs.forEach(img => {
        img.parentElement.classList.remove('albumPic-active')
        img.classList.remove('opacity-100')
    })
    e.target.parentElement.classList.add('albumPic-active')
    e.target.classList.add('opacity-100')
    renderContent(e.target.dataset.id)
})

// 頭像修改成功彈窗
successMessage.addEventListener('click', function () {
    Swal.fire({
        scrollbarPadding: false,
        title: "修改成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
    $('#pic-modal').modal('hide');
})

// 跳轉至變更密碼
const swiper = new Swiper('.swiper-container', {
    initialSlide: 0, // 初始顯示的頁面
    navigation: {
        nextEl: '#changePwd-btn', // 下一頁按鈕
        prevEl: '.swiper-prev-btn'  // 上一頁按鈕
    },
    allowTouchMove: false, // 禁止手指滑動
    spaceBetween: 20,
});

document.getElementById('changePwd-btn').addEventListener('click', function () {
    swiper.slideNext();
});

document.getElementById('prev-btn').addEventListener('click', function () {
    swiper.slidePrev();
});

// 變更密碼表單送出
changePwdForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nowPwdValue = nowPwd.value.trim();
    const setNewPwdValue = setNewPwd.value.trim();
    const rePwdValue = rePwd.value.trim();

    nowPwd.classList.remove('is-invalid');
    setNewPwd.classList.remove('is-invalid');
    rePwd.classList.remove('is-invalid');

    if (nowPwdValue === '' || setNewPwdValue === '' || rePwdValue === '') {
        setErrorFor(nowPwd, '欄位不得為空');
        setErrorFor(setNewPwd, '欄位不得為空');
        setErrorFor(rePwd, '欄位不得為空');
    } else if (setNewPwdValue !== rePwdValue) {
        Swal.fire({
            scrollbarPadding: false,
            icon: 'error',
            title: '密碼不一致'
        });
    } else if (setNewPwdValue.length < 6 || rePwdValue.length < 6) {
        setErrorFor(setNewPwd, '密碼至少需要6個字元');
        setErrorFor(rePwd, '密碼至少需要6個字元');
        Swal.fire({
            scrollbarPadding: false,
            icon: 'error',
            title: '密碼至少需要6個字元'
        });
    } else {
        setSuccessFor(rePwdValue);
        nowPwd.classList.add('is-invalid');
        setNewPwd.classList.add('is-invalid');
        rePwd.classList.add('is-invalid');
        Swal.fire({
            scrollbarPadding: false,
            icon: 'success',
            title: '變更密碼成功'
        }).then((result) => {
            if (result.isDismissed || result.isConfirmed) {
                location.href = 'user.html';
            }
        });
    }
})

function setErrorFor(input, message) {
    const formFloating = input.parentElement;
    const errTxt = formFloating.querySelector('.invalid-feedback');
    errTxt.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
}