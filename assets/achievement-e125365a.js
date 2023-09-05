import{a as n,S as m,U as g}from"./footer-203576fd.js";import"./user_nav-b8e04adf.js";import{l as i}from"./index-ac7bb0e8.js";const{VITE_BASEURL:l}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},c={async getTotal(){try{return(await n.get(`${l}/avatars`)).data}catch(t){console.log(t)}},async setAvatar(t){try{const a=await n.patch(`${l}/users/${localStorage.getItem("userId")}`,{avatarId:Number(t)});return m.fire({icon:"success",title:"頭像變更成功"}),a.data}catch(a){console.log(a)}}},v=document.querySelector(".finish-avatars"),p=document.querySelector(".first-avatar"),u=document.querySelector(".apply-avatar"),y=document.querySelector(".study-avatars"),f=document.querySelector(".badge-table-cur"),o=document.querySelector(".badge-content");let r,s;async function $(){i(),r=await c.getTotal(),s=await g.getUserInfo(),i(r),console.log(r);const t=r.reduce((a,e)=>(a[e.name]?a[e.name].push(e):a[e.name]=[{...e}],a),{});v.innerHTML=t.完課徽章.map(a=>`
    <div class="col position-relative">
        <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="完課徽章-LV${a.level}">
    </div>`).join(""),p.innerHTML=t.入門徽章.map(a=>`
    <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="入門徽章">
    `).join(""),u.innerHTML=t.申課徽章.map(a=>`
    <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="申課徽章">
    `).join(""),y.innerHTML=t.學習徽章.map(a=>`
    <div class="col position-relative">
        <img data-id="${a.id}" class="w-100 h-100 avatar-img" src="${a.image}" alt="學習徽章-LV${a.level}">
    </div>`).join("")}$();f.addEventListener("click",t=>{if(!t.target.dataset.id)return;document.querySelectorAll(".avatar-img").forEach(e=>{e.parentElement.classList.remove("avatar-active"),e.classList.remove("opacity-100")}),t.target.parentElement.classList.add("avatar-active"),t.target.classList.add("opacity-100"),d(t.target.dataset.id)});function d(t){const a=r.find(e=>e.id===Number(t));o.innerHTML=`
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
    </article>`}o.addEventListener("click",t=>{const{id:a}=t.target.dataset;a&&(c.setAvatar(a),s.avatarId=Number(a),d(a))});
