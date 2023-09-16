import{U as o}from"./main-20e5e0cf.js";import"./user_nav-b8e04adf.js";import{l as r}from"./index-64ae5ba6.js";import{A as i}from"./avatars-b957534f.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";const d=document.querySelector(".finish-avatars"),m=document.querySelector(".first-avatar"),p=document.querySelector(".apply-avatar"),v=document.querySelector(".study-avatars"),g=document.querySelector(".badge-table-cur"),l=document.querySelector(".badge-content");let n,s;async function u(){r(),n=await i.getTotal(),s=await o.getUserInfo();const t=n.reduce((a,e)=>(a[e.name]?a[e.name].push(e):a[e.name]=[{...e}],a),{});r(t),d.innerHTML=t.完課徽章.map(a=>`
    <div class="col position-relative">
        <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="完課徽章-LV${a.level}">
    </div>`).join(""),m.innerHTML=t.入門徽章.map(a=>`
    <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="入門徽章">
    `).join(""),p.innerHTML=t.申課徽章.map(a=>`
    <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="申課徽章">
    `).join(""),v.innerHTML=t.學習徽章.map(a=>`
    <div class="col position-relative">
        <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="學習徽章-LV${a.level}">
    </div>`).join("")}u();g.addEventListener("click",t=>{if(!t.target.dataset.id)return;document.querySelectorAll(".avatar-img").forEach(e=>{e.parentElement.classList.remove("avatar-active"),e.classList.remove("opacity-100")}),t.target.parentElement.classList.add("avatar-active"),t.target.classList.add("opacity-100"),c(t.target.dataset.id)});function c(t){const a=n.find(e=>e.id===Number(t));l.innerHTML=`
   <article class="px-4 flex-grow-1">
        <div class="position-relative">
        ${s.avatarId===Number(t)?'<span class="position-absolute start-50 translate-middle-x">[ 當前頭像 ]</span>':""}
        ${s.avatars.includes(Number(t))?'<span class="btn bg-secondary text-primary float-end py-2 px-3">已獲得</span>':'<span class="btn bg-gray-300 text-gray-400 float-end py-2 px-3">未獲得</span>'}
        <img src="${a.image}" alt="${a.name}-${a.level}" class="w-100 my-3">

        </div>
        <section class="text-start">
        <h2 class="fs-5 mb-4 fw-bold">${a.name} - LV ${a.level}</h2>
        <p class="mb-0">獲得途徑:</p>
        <div class="d-flex flex-wrap justify-content-between">
            <div>
            <p>${a.getFn}</p>
            ${a.name==="學習徽章"?`<p class="text-gray-400">已累積學習: ${s.totalCheckIn}天</p>`:a.name==="完課徽章"?`<p class="text-gray-400">已累積完課: ${s.passes.filter(e=>e.isFinish).length}次</p>`:""}
            </div>
           
            <button data-id="${t}" type="button" class=" ${s.avatars.includes(Number(t))?"":"visually-hidden"} btn btn-danger btn-state fs-6 float-end setting-avatar">設為頭像</button>
        </div>
        </section>
    </article>`}l.addEventListener("click",t=>{const{id:a}=t.target.dataset;a&&(i.setAvatar(a),s.avatarId=Number(a),c(a))});
