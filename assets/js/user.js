import Swiper from "swiper";
import { Avatars, User, loading } from '../api/index'
import { Modal } from "bootstrap";
import axios from "axios";
const { VITE_BASEURL } = import.meta.env
import Swal from 'sweetalert2';


const nickNameInput = document.getElementById('nickName');
const editBtn = document.querySelector("#edit-btn");
const saveBtn = document.querySelector("#save-btn");
const nowPwd = document.querySelector("#now-pwd");
const setNewPwd = document.querySelector("#set-newPwd");
const rePwd = document.querySelector("#re-pwd");
const changePwdForm = document.querySelector("#changePwdForm");
const album = document.querySelector(".album");
const successMessage = document.querySelector('#success-message')

const picModal = new Modal($('#pic-modal'))

let user;
let avatars;
let albumId;
async function init() {
    try {
        loading()
        user = await User.getUserInfo();
        loading(user)
        document.getElementById('nickName').value = user.nickName;
        document.getElementById('email').value = user.email;
        $('.user-avatar').attr('src', user.avatar.image)
        albumId = user.avatarId
        avatars = await Avatars.getTotal();
        renderAlbum(avatars)
    } catch (err) {
        loading()
    }
}

init();
function renderAlbum (avatars) {
    const hasAvatars = user.avatars.map(hasAvatar => avatars.find(avatar => avatar.id === hasAvatar))
    album.innerHTML = `
    <div class="row g-4">
    ${
        hasAvatars.map(avatar => `
    <div class="col-lg-4 col-6">
        <button class="btn p-0 ${user.avatarId === avatar.id ? 'albumPic-active': ''}" type="button">
        <img data-id="${avatar.id}" class="avatar-img" src="${avatar.image}" alt="${avatar.name}-${avatar.level}" />
        </button>
    </div>`).join('')
    }
    </div>
    `
}

// 編輯暱稱
editBtn.addEventListener('click', function (e) {
    nickNameInput.removeAttribute("readonly");
    nickNameInput.focus()
    editBtn.classList.add("d-none");
    saveBtn.classList.remove("d-none");
    saveBtn.classList.remove("btn-secondary");
    saveBtn.classList.add("btn-outline-secondary");
})
saveBtn.addEventListener('click', function (e) {
    nickNameInput.value = nickNameInput.value.trim()

    if(nickNameInput.value !== user.nickName) {
        // 跟 user 本身暱稱不同才更新
        User.updateUser({nickName: nickNameInput.value})
    }
    nickNameInput.setAttribute("readonly", true);
    saveBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");
});

//修改頭像
$('.pic-modal-btn').click(() => picModal.show())
album.addEventListener('click', (e) => {
    const imgs = document.querySelectorAll('.avatar-img')
    imgs.forEach(img => {
        img.parentElement.classList.remove('albumPic-active')
        img.classList.remove('opacity-100')
    })
    e.target.parentElement.classList.add('albumPic-active')
    e.target.classList.add('opacity-100')
    albumId = Number(e.target.dataset.id)
})
// 頭像修改成功彈窗
successMessage.addEventListener('click', function () {
    if (albumId === user.avatarId) {
        Swal.fire({
            scrollbarPadding: false,
            icon: 'success',
            title: '頭像變更成功',
            showConfirmButton: false,
            timer: 1500
          })
    } else {
        Avatars.setAvatar(albumId)
        $('.user-avatar').attr('src', avatars.find(avatar => avatar.id === albumId).image)
    }
    picModal.hide()
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
$('#changePwd-btn').click(() => swiper.slideNext())
$('#prev-btn').click(() => swiper.slidePrev())

// 變更密碼表單送出
changePwdForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nowPwdValue = nowPwd.value.trim();
    const setNewPwdValue = setNewPwd.value.trim();
    const rePwdValue = rePwd.value.trim();

    let hasError = setErrorFor(nowPwd);
    hasError = setErrorFor(setNewPwd);
    hasError = setErrorFor(rePwd);
    if(hasError) return
    if (setNewPwdValue !== rePwdValue) {
        swalError('密碼不一致')
        return
    } 
    try {
        await axios.post(`${VITE_BASEURL}/login`, {
            email: user.email,
            password: nowPwdValue
        });
        User.updateUser({password: rePwdValue}, true)
        const swal = await Swal.fire({
            scrollbarPadding: false,
            icon: 'success',
            title: '變更密碼成功, 請重新登入',
            showConfirmButton: false,
            timer: 1500
        })
        if(swal.isDismissed || swal.isConfirmed){
            User.clearUserInfo()
            location.href = 'index.html'
        }
    } catch(err) {
        swalError('當前密碼錯誤')
    }
})

function setErrorFor(input, message) {
    const formFloating = input.parentElement;
    const errTxt = formFloating.querySelector('.invalid-feedback');
    const trimStr = input.value.trim()
    if(!trimStr) errTxt.innerText = '欄位不得為空'
    if(trimStr && trimStr.length < 6) errTxt.innerText = '密碼至少需要6個字元'
    return !trimStr || trimStr.length < 6
}
function swalError(msg) {
    Swal.fire({
        scrollbarPadding: false,
        icon: 'error',
        title: msg
    })
}