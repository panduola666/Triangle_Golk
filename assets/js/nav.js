const nav = document.querySelector('.header-nav')
// 輸入框
const navSearch = document.querySelector('.nav-search')
const searchType = document.querySelector('.nav-search-type')
const searchValue = document.querySelector('.nav-search-value')
const searchBtn = document.querySelector('.nav-search-btn')
// 小鈴鐺
const notifyBtn = document.querySelector('.notify-btn')
const notifyMenu = document.querySelector('.notify-menu')

const navItem = document.querySelectorAll('.nav-page')
const loginBtn = document.querySelector('.nav-login')
const userMenu = document.querySelector('.user-menu')

// 側面菜單
const asideUser = document.querySelector('.aside-user')
const asideLogin = document.querySelector('.aside-login')
const asideSignOut = document.querySelector('.aside-sign-out')
    
if(localStorage.getItem('token')) {
    // 已登入要隱藏
    asideLogin.classList.add('d-none')
    // 已登入要顯示
    loginBtn.classList.remove('d-lg-block')
    navItem[1].classList.remove('d-lg-none')
    userMenu.classList.remove('d-lg-none')
    asideUser.classList.remove('d-none')
    asideSignOut.classList.remove('d-none')
}else{
    // 未登入要隱藏
    loginBtn.classList.add('d-lg-block')
    navItem[1].classList.add('d-lg-none')
    userMenu.classList.add('d-lg-none')
    asideUser.classList.add('d-none')
    asideSignOut.classList.add('d-none')
    // 未登入要顯示
    asideLogin.classList.remove('d-none')

}

navItem.forEach(item => {
    console.log(item.dataset.page);
    console.log(location.href.includes(item.dataset.page));
    if(location.href.includes(item.dataset.page)){
        item.children[0].classList.add('active')
    }else{
        item.children[0].classList.remove('active')
    }
})

// 輸入框顯示
navSearch.addEventListener('mouseenter', (e) => {
    navSearch.classList.remove('border-0')
    searchType.classList.remove('d-none')
    searchValue.classList.remove('d-none')
})
// 輸入框隱藏
navSearch.addEventListener('mouseleave', (e) => {
    if(searchValue.value) return
    setTimeout(()=>{
    navSearch.classList.add('border-0')
    searchType.classList.add('d-none')
    searchValue.classList.add('d-none')
    },300)
})

notifyBtn.addEventListener('click', () => {
    notifyMenu.classList.toggle('d-none')
})
nav.addEventListener('mouseleave', (e) => {
    notifyMenu.classList.add('d-none')
})

asideUser.addEventListener('click', (e) => {
    console.dir();
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