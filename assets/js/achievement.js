const finishAvatars = document.querySelector('.finish-avatars')
const firstAvatar = document.querySelector('.first-avatar')
const applyAvatar = document.querySelector('.apply-avatar')
const studyAvatars = document.querySelector('.study-avatars')
const badgeTable = document.querySelector('.badge-table-cur')
const badgeContent = document.querySelector('.badge-content')

import { Avatars, User, loading } from '../api/index'

let avatars
let user
async function init() {
    loading()
    avatars = await Avatars.getTotal()
    user = await User.getUserInfo()
    loading(avatars)
    console.log(avatars);
    const filterData = avatars.reduce((obj, avatar) => {
        obj[avatar.name] ? obj[avatar.name].push(avatar) : obj[avatar.name] = [{...avatar}]
        return obj
    }, {})
    finishAvatars.innerHTML = filterData['完課徽章'].map(item => `
    <div class="col position-relative">
        <img data-id="${item.id}" class="w-100 h-100 avatar-img" src="${item.image}" alt="完課徽章-LV${item.level}">
    </div>`).join('')
    firstAvatar.innerHTML = filterData['入門徽章'].map(item => `
    <img data-id="${item.id}" class="w-100 h-100 avatar-img" src="${item.image}" alt="入門徽章">
    `).join('')
    applyAvatar.innerHTML = filterData['申課徽章'].map(item => `
    <img data-id="${item.id}" class="w-100 h-100 avatar-img" src="${item.image}" alt="申課徽章">
    `).join('')
    studyAvatars.innerHTML = filterData['學習徽章'].map(item => `
    <div class="col position-relative">
        <img data-id="${item.id}" class="w-100 h-100 avatar-img" src="${item.image}" alt="學習徽章-LV${item.level}">
    </div>`).join('')
}
init()

badgeTable.addEventListener('click', (e) => {
    if(!e.target.dataset.id) return
    const imgs = document.querySelectorAll('.avatar-img')
    imgs.forEach(img => {
        img.parentElement.classList.remove('avatar-active')
        img.classList.remove('opacity-100')
    })
    e.target.parentElement.classList.add('avatar-active')
    e.target.classList.add('opacity-100')
    renderContent(e.target.dataset.id)
})

function renderContent (id) {
   const avatar = avatars.find(item => item.id === Number(id))

   badgeContent.innerHTML = `
   <article class="px-4 flex-grow-1">
        <div class="position-relative">
        ${user.avatarId === Number(id) ? '<span class="position-absolute start-50 translate-middle-x">[ 當前頭像 ]</span>' : ''}
        ${user.avatars.includes(Number(id)) ? 
        `<span class="btn bg-secondary text-primary float-end py-2 px-3">已獲得</span>`
        :  `<span class="btn bg-gray-300 text-gray-400 float-end py-2 px-3">未獲得</span>`}
        <img src="${avatar.image}" alt="${avatar.name}-${avatar.level}" class="w-100 my-3">

        </div>
        <section class="text-start">
        <h2 class="fs-5 mb-4 fw-bold">${avatar.name} - LV ${avatar.level}</h2>
        <p class="mb-0">獲得途徑:</p>
        <div class="d-flex flex-wrap justify-content-between">
            <div>
            <p>${avatar.getFn}</p>
            ${avatar.name === '學習徽章' ? `<p class="text-gray-400">已累積學習: ${user.totalCheckIn}天</p>` :
            avatar.name === '完課徽章' ? `<p class="text-gray-400">已累積完課: ${user.passes.filter(item => item.isFinish).length}次</p>` : ''}
            </div>
           
            <button data-id="${id}" type="button" class=" ${user.avatars.includes(Number(id)) ? '' : 'visually-hidden'} btn btn-danger btn-state fs-6 float-end setting-avatar">設為頭像</button>
        </div>
        </section>
    </article>`
}

badgeContent.addEventListener('click', (e) => {
    const {id} = e.target.dataset
    if(!id) return
    Avatars.setAvatar(id)
    user.avatarId = Number(id)
    renderContent(id)
})