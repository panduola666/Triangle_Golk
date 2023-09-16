import{S as k,U as E}from"./main-20e5e0cf.js";import"./apply_course-3b56bc98.js";import{S as H}from"./swiper-core-19160206.js";import{N as M,A}from"./autoplay-054b67c1.js";import{l as x}from"./index-64ae5ba6.js";import{F as h}from"./favorites-ff1c6920.js";import{P as j}from"./passes-825c0143.js";import{C as u}from"./comment-2e7060f2.js";import{C as I}from"./course-fe90b3c4.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";import"https://unpkg.com/@wangeditor/editor@latest/dist/index.js";import"./avatars-b957534f.js";const B=document.querySelector(".course-title section"),f=document.querySelector(".favorite-btn"),P=f.querySelector(".course-favorite-icon"),U=document.querySelector(".blackboard-mark"),D=document.querySelector(".course-cover"),F=document.querySelector(".course-scores"),O=document.querySelector(".course-tags"),i=document.querySelector(".course-test"),y=document.querySelector(".classroom-btn"),q=document.querySelector(".test-passed"),V=document.querySelector(".course-page-nav"),$=V.querySelectorAll("[data-key]"),m=document.querySelector(".comment-list"),b=document.querySelector(".pagination"),N=document.querySelector(".other-courses > ul"),g=new URLSearchParams(window.location.search),l=g.has("id")&&g.get("id");let d=g.has("sort")&&g.get("sort"),p,n,r;async function S(){if(!localStorage.getItem("token")){f.classList.add("d-none"),y.classList.add("d-none");return}try{if(r=await E.getUserInfo(),!r)return;f.classList.remove("d-none"),r.favorites.find(e=>Number(e.courseId)===Number(l))?P.classList.remove("outline-icon"):P.classList.add("outline-icon"),r.passes.some(e=>Number(e.courseId)===Number(l))&&C()}catch{f.classList.add("d-none"),y.classList.add("d-none")}}async function R(){try{x(),await S(),p=await I.getCourse(l),n=await u.getComments(1,6,d,"desc",l),x(p),_(p),d==="timer"&&$[0].classList.add("active"),d==="likesNum"&&$[1].classList.add("active"),L(n),T(),z()}catch{}}function C(){i.classList.add("d-none"),q.classList.remove("d-none"),y.classList.remove("d-none"),y.setAttribute("href",`classroom.html?courseId=${l}`)}function _(e){B.innerHTML=`
  <span class="bg-secondary text-white py-2 px-4 rounded-1 me-lg-3 me-2 mb-1 mb-lg-0">${e.platform}</span>
  <h1 class="page-title fs-lg-2 fs-4 fw-bold">
    ${e.title}
  </h1>
              `,U.setAttribute("href",e.url),D.setAttribute("src",e.cover);let t="";for(let s=1;s<=5;s++)t+=`<span class="fs-2 material-symbols-outlined ${s<=e.avgScore?"":"outline-icon"}">star</span>`;F.innerHTML=t,O.innerHTML=e.tags.map(s=>`<li class="border border-secondary p-1 px-3 rounded-5 small">${s}</li>`).join(""),q.innerHTML=`已經有 ${e.passes.length} 人通過測驗，趕快來進來交流吧！`}function L(e){if(console.log(e),m.classList.remove("justify-content-around"),!e.data.length){m.innerHTML='<li class="text-center fs-3 py-4">當前課程尚未評論</li>';return}m.innerHTML=e.data.map((t,s)=>{const o=t.user.email.split("@")[0],a=`${o[0]}***${o[o.length-1]}`;return`<li class="col-lg-4">
    <article
      class="fw-bold ${t.theme?"course-page-comment":"comment-style0"} bg-${(s+1)%3===0?"blue":(s+1)%3===1?"primary":"orange"} px-3 pb-3 d-flex flex-column h-100"
    >
    <div class="flex-grow-1">
        <div class="stars-icon d-flex float-end">
          <span class="material-symbols-outlined ${t.score>=1?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${t.score>=2?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${t.score>=3?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${t.score>=4?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${t.score>=5?"":"outline-icon"}">star</span>
        </div>
        <p class="fs-5 mb-2">${Number(t.showName)?t.user.nickName:a}：</p>
        <div class="fs-6">
          ${t.content}
        </div>
    </div>
      <div class="${localStorage.getItem("token")?"d-flex":"d-none"} align-items-center gap-2">
          <!-- 用 .active 控制是否點擊 -->
        <span class="thumb-up ${r&&t.likes.includes(r.id)?"active":""} material-symbols-outlined cur-point" data-comment="${t.id}">
          thumb_up
          </span>
        <p class="mb-0">${t.likesNum}</p>
      </div>
    </article>
  </li>`}).join("")}function T(){if(!n.totalPages){b.innerHTML="";return}let e="";for(let s=1;s<=n.totalPages;s++)e+=`<li class="page-item p-hover ${n.currentPage===s?"active":""}"><a class="page-link" href="#" data-link="${s}">${s}</a></li>`;b.innerHTML=`
  <li class="page-item p-hover">
      <a class="page-link ${n.currentPage===1?"d-none":""}" href="#" aria-label="Previous" data-link="${n.currentPage-1}">
          <span aria-hidden="true">&laquo;</span>
      </a>
  </li>
  ${e}
  <li class="page-item p-hover">
      <a class="page-link ${n.currentPage===n.totalPages?"d-none":""}" href="#" aria-label="Next" data-link="${n.currentPage+1}">
          <span aria-hidden="true">&raquo;</span>
      </a>
  </li>`,b.addEventListener("click",t);async function t(s){s.preventDefault(),s.stopPropagation(),s.target.dataset.link&&(b.removeEventListener("click",t),s.target.dataset.link&&(n=await u.getComments(Number(s.target.dataset.link),6,d,"desc",l)),L(n),T())}}async function z(){const e=await I.getAllCourses(),t=[];e.forEach(a=>{a.tags.some(v=>p.tags.includes(v))&&t.push(a)});const s=t.filter(a=>a.avgScore>=3);if(!s.length){N.innerHTML=`
    <li class="flex-grow-1 text-center">
      <p class="fs-4">沒有相似課程</p>
      <a href="./course.html" class="btn btn-primary">來去逛逛</a>
    </li>
    `;return}N.innerHTML=s.map(a=>`
    <div class="swiper-slide">
      <li class="d-flex flex-column">
        <a class="card card-hover h-100 rounded-4 position-relative" href="./coursepages.html?id=${a.id}&sort=timer">
          <div class="pic">
            <img
              src="${a.cover}"
              alt="${a.title}"
              class="card-pic"
            />
          </div>
          <div
            class="badge d-flex justify-content-between align-items-center position-absolute"
          >
            <span
              class="brand bg-secondary small text-white rounded-1 py-1 px-3"
              >${a.platform}</span
            >
            
            <span
            class="${localStorage.getItem("token")?"":"d-none"} favorite others-favorite-btn material-symbols-outlined position-absolute ${localStorage.getItem("token")&&a.favorites.some(c=>c.userId===r.id)?"":"outline-icon"}"
            data-id="${a.id}"
            >favorite</span
          >
          </div>
          <div class="card-body">
            <h3 class="title text-secondary fs-6 fw-bold text-truncate">${a.title}</h3>
          </div>
          <div class="card-footer">
            <div class="tags mb-2 mt-auto">
            ${a.tags.map(c=>`<span class="fs-8 me-2">#${c}</span>`).join("")}
            </div>
            <div class="stars d-flex">
              <div class="stars-icon text-primary me-2">
                <span class="material-symbols-outlined ${a.avgScore>=1?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${a.avgScore>=2?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${a.avgScore>=3?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${a.avgScore>=4?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${a.avgScore>=5?"":"outline-icon"}"
                  >star</span
                >
              </div>
              <span class="fs-8 text-gray-400">(${a.comments.length})</span>
            </div>
          </div>
        </a>
      </li>
    </div>
    `).join(""),new H(".other-courses",{slidesPerView:1,spaceBetween:30,centeredSlides:!1,loop:!0,breakpoints:{992:{slidesPerView:3}},modules:[M,A],autoplay:{delay:3e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"}}),document.querySelectorAll(".others-favorite-btn").forEach(a=>{a.addEventListener("click",async c=>{c.preventDefault();const v=r.favorites.findIndex(w=>Number(w.courseId)===Number(c.target.dataset.id));if(v===-1)await h.add(l),a.classList.remove("outline-icon");else{const w=r.favorites[v].id;await h.remove(w),a.classList.add("outline-icon")}await S()})})}R();f.addEventListener("click",async e=>{e.stopPropagation();const t=r.favorites.findIndex(s=>Number(s.courseId)===Number(l));if(t===-1)await h.add(l);else{const s=r.favorites[t].id;await h.remove(s)}await S()});i.addEventListener("submit",e=>{if(e.preventDefault(),i["test-name"].classList.remove("is-invalid"),i["test-brand"].classList.remove("is-invalid"),i["test-name"].value.trim()||i["test-name"].classList.add("is-invalid"),i["test-brand"].value.trim()||i["test-brand"].classList.add("is-invalid"),![...i.querySelectorAll(".is-invalid")].length){if(i["test-name"].value.trim()!==p.title||i["test-brand"].value.trim()!==p.platform){i.reset(),k.fire({scrollbarPadding:!1,icon:"error",title:"回答錯誤,再找找答案吧"});return}if(!localStorage.getItem("token")){k.fire({scrollbarPadding:!1,icon:"error",title:"請加入會員",showConfirmButton:!1,timer:1500});return}j.addPasses({userId:r.id,courseId:Number(l),isFinish:!1}),C()}});$.forEach(e=>{e.addEventListener("click",async t=>{$.forEach(o=>o.classList.remove("active")),e.classList.add("active"),d=t.target.dataset.key,m.classList.add("justify-content-around"),m.innerHTML=`<li class="spinner-border m-0 text-success" role="status" style="width: 100px; height: 100px;">
    <span class="visually-hidden">Loading...</span>
  </li>`;const s=await u.getComments(1,6,d,"desc",l);L(s)})});m.addEventListener("click",async e=>{if(!e.target.dataset.comment)return;const t=await u.getCurrent(Number(e.target.dataset.comment)),{id:s,likes:o,likesNum:a}=t;if(o.includes(r.id))return;o.push(r.id);const c={likes:o,likesNum:o.length};console.log(d),u.likeComment(s,c),L(await u.getComments(n.currentPage,6,d,"desc",g.get("id")))});
