import { Notions } from "../api/Notions"
const nav = document.querySelector('.header-nav')
// 輸入框
const navSearch = document.querySelector('.nav-search')
const searchType = document.querySelector('.nav-search-type')
const searchValue = document.querySelector('.nav-search-value')
const searchBtn = document.querySelector('.nav-search-btn')
const searchChoose = document.querySelector('.search-dropdown')
const searchModal = document.querySelector('.search-modal')
// 小鈴鐺
const notifyBtn = document.querySelector('.notify-btn')
const notifyMenu = document.querySelector('.notify-menu')
const notifyInfo = document.querySelector('.notify-info')

const navItem = document.querySelectorAll('.nav-page')
const loginBtn = document.querySelector('.nav-login')
const userMenu = document.querySelector('.user-menu')

// 側面菜單
const asideUser = document.querySelector('.aside-user')
const asideLogin = document.querySelector('.aside-login')
const asideSignOut = document.querySelector('.aside-sign-out')

const currentPage = window.location.href.split('/').pop().split('.')[0];
if(localStorage.getItem('token')) {
    // 已登入要隱藏
    asideLogin.classList.add('d-none')
    // 已登入要顯示
    loginBtn.classList.remove('d-lg-block')
    navItem[1].classList.remove('d-lg-none')
    userMenu.classList.remove('d-lg-none')
    asideUser.classList.remove('d-none')
    asideSignOut.classList.remove('d-none')
    notifyBtn.classList.remove('d-none')
    getNotions()
}else{
    // 未登入要隱藏
    loginBtn.classList.add('d-lg-block')
    navItem[1].classList.add('d-lg-none')
    userMenu.classList.add('d-lg-none')
    asideUser.classList.add('d-none')
    asideSignOut.classList.add('d-none')
    notifyBtn.classList.add('d-none')
    // 未登入要顯示
    asideLogin.classList.remove('d-none')

}

// nav 哪個頁面 active
navItem.forEach(item => {
    if(currentPage === item.dataset.page){
        item.children[0].classList.add('active')
    }else{
        item.children[0].classList.remove('active')
    }
})

// 課程查詢
searchChoose.addEventListener('click', e => {
    searchType.textContent = e.target.textContent
})
searchBtn.addEventListener('click', e => {
    const key = searchType.textContent.trim() === '平台' ? 'platform' : 'q'
    const value = searchValue.value.trim()
        location.href = `/pages/course.html${value? `?${key}=${value}` : ''}`
})
searchModal.addEventListener('submit',(e) => {
    e.preventDefault()
     // 获取所有复选框元素
    const checkboxes = searchModal.querySelectorAll('input[type="checkbox"]');
    // 遍历复选框元素并获取选中的复选框的值
    const platform = [];
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            platform.push(`platform=${checkbox.value}`);
        }
    });
    let str = '?'
    str += platform.join('&')
    if(searchModal['nav-search-bar'].value){
        str += `${platform.length ? '&' : ''}q=${searchModal['nav-search-bar'].value}`
    }
    location.href = `/pages/course.html${str === '?' ? '' : str}`
})

// 小鈴鐺
async function getNotions(more = false) {
    const res = await Notions.get()
    if(res.length) notifyInfo.classList.remove('d-none')

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
    notifyMenu.innerHTML = res.slice(0, more? res.length : 3).map(info => `
    <li class="py-2 px-sm">
        <p class="text-gray-600 mb-2">
        ${info.content}
        </p>
        <p class="m-0 d-flex align-items-center justify-content-between">
        <span>${new Date(info.timer).toLocaleString("zh-TW", options).replace(/\//g, '-')}</span>
        <span data-id=${info.id} class="material-symbols-outlined cur-point">
            delete
            </span>
        </p>
    </li>`).join('')
    if(!more && res.length > 3) {
        notifyMenu.innerHTML += `
        <li class="py-2 px-sm text-center small cur-point" data-id="more">
            顯示更多
        </li>`
    }
}
notifyMenu.addEventListener('click',async (e) => {
    const {id} = e.target.dataset
    if(!id) return
    if(id === 'more') return getNotions(id)
    await Notions.delete(id)
    getNotions()
})

// 登出


// 以下是 nav 顯示效果
// 輸入框顯示
navSearch.addEventListener('mouseenter', showSearch)
navSearch.addEventListener('click', showSearch)
function showSearch() {
    console.log(1);
    navSearch.classList.remove('border-0')
    searchType.classList.remove('d-none')
    searchValue.classList.remove('d-none')
}
// 輸入框隱藏
document.addEventListener('mousemove', (e) => {
    if(searchValue.value) return
    if(e.clientY > 250) {
        navSearch.classList.add('border-0')
        searchType.classList.add('d-none')
        searchValue.classList.add('d-none')
    }
})

notifyBtn.addEventListener('click', () => {
    notifyMenu.classList.toggle('d-none')
})
nav.addEventListener('mouseleave', (e) => {
    notifyMenu.classList.add('d-none')
})

asideUser.addEventListener('click', (e) => {
    if(e.target.children[0].innerText.trim() === 'add') {
        // 展開
        e.target.children[0].innerText = 'remove'
        asideUser.nextElementSibling.classList.remove('d-none')
    } else{
        // 收合
        e.target.children[0].innerText = 'add'
        asideUser.nextElementSibling.classList.add('d-none')
    }
})