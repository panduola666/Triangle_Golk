import{S,U as E}from"./main-b28f6a90.js";import"./apply_course-9c1ee343.js";import{S as H}from"./swiper-core-19160206.js";import{N as M,A}from"./autoplay-054b67c1.js";import{l as x}from"./index-972ae5fb.js";import{F as g}from"./favorites-858cd1c0.js";import{C as f}from"./comment-24e62baa.js";import{P as j}from"./passes-b2ed1cd6.js";import{C as I}from"./course-f55b6d4c.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";import"https://unpkg.com/@wangeditor/editor@latest/dist/index.js";import"./avatars-7fdc7783.js";const B=document.querySelector(".course-title section"),b=document.querySelector(".favorite-btn"),P=b.querySelector(".course-favorite-icon"),U=document.querySelector(".blackboard-mark"),D=document.querySelector(".course-cover"),F=document.querySelector(".course-scores"),O=document.querySelector(".course-tags"),n=document.querySelector(".course-test"),w=document.querySelector(".classroom-btn"),q=document.querySelector(".test-passed"),V=document.querySelector(".course-page-nav"),h=V.querySelectorAll("[data-key]"),m=document.querySelector(".comment-list"),v=document.querySelector(".pagination"),N=document.querySelector(".other-courses > ul"),y=new URLSearchParams(window.location.search),l=y.has("id")&&y.get("id");let d=y.has("sort")&&y.get("sort"),p,i,r;async function k(){if(!localStorage.getItem("token")){b.classList.add("d-none"),w.classList.add("d-none");return}r=await E.getUserInfo(),r&&(b.classList.remove("d-none"),r.favorites.find(s=>Number(s.courseId)===Number(l))?P.classList.remove("outline-icon"):P.classList.add("outline-icon"),r.passes.some(s=>Number(s.courseId)===Number(l))&&C())}async function R(){try{x(),await k(),p=await I.getCourse(l),i=await f.getComments(1,6,d,"desc",l),x(p),_(p),d==="timer"&&h[0].classList.add("active"),d==="likesNum"&&h[1].classList.add("active"),$(i),T(),z()}catch{}}function C(){n.classList.add("d-none"),q.classList.remove("d-none"),w.classList.remove("d-none"),w.setAttribute("href",`classroom.html?courseId=${l}`)}function _(s){B.innerHTML=`
  <span class="bg-secondary text-white py-2 px-4 rounded-1 me-lg-3 me-2 mb-1 mb-lg-0">${s.platform}</span>
  <h1 class="page-title fs-lg-2 fs-4 fw-bold text-nowrap">
    ${s.title}
  </h1>
              `,U.setAttribute("href",s.url),D.setAttribute("src",s.cover);let t="";for(let e=1;e<=5;e++)t+=`<span class="fs-2 material-symbols-outlined ${e<=s.avgScore?"":"outline-icon"}">star</span>`;F.innerHTML=t,O.innerHTML=s.tags.map(e=>`<li class="border border-secondary p-1 px-3 rounded-5 small">${e}</li>`).join(""),q.innerHTML=`已經有 ${s.passes.length} 人通過測驗，趕快來進來交流吧！`}function $(s){if(m.classList.remove("justify-content-around"),!s.data.length){m.innerHTML='<li class="text-center fs-3 py-4">當前課程尚未評論</li>';return}m.innerHTML=s.data.map((t,e)=>{const o=t.user.email.split("@")[0],a=`${o[0]}***${o[o.length-1]}`;return`<li class="col-lg-4">
    <article
      class="fw-bold ${t.theme?"course-page-comment":"comment-style0"} bg-${(e+1)%3===0?"blue":(e+1)%3===1?"primary":"orange"} px-3 pb-3 d-flex flex-column h-100"
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
  </li>`}).join("")}function T(){if(!i.totalPages){v.innerHTML="";return}let s="";for(let e=1;e<=i.totalPages;e++)s+=`<li class="page-item p-hover ${i.currentPage===e?"active":""}"><a class="page-link" href="#" data-link="${e}">${e}</a></li>`;v.innerHTML=`
  <li class="page-item p-hover">
      <a class="page-link ${i.currentPage===1?"d-none":""}" href="#" aria-label="Previous" data-link="${i.currentPage-1}">
          <span aria-hidden="true">&laquo;</span>
      </a>
  </li>
  ${s}
  <li class="page-item p-hover">
      <a class="page-link ${i.currentPage===i.totalPages?"d-none":""}" href="#" aria-label="Next" data-link="${i.currentPage+1}">
          <span aria-hidden="true">&raquo;</span>
      </a>
  </li>`,v.addEventListener("click",t);async function t(e){e.preventDefault(),e.stopPropagation(),e.target.dataset.link&&(v.removeEventListener("click",t),e.target.dataset.link&&(i=await f.getComments(Number(e.target.dataset.link),6,d,"desc",l)),$(i),T())}}async function z(){const s=await I.getAllCourses(),t=[];s.forEach(a=>{a.tags.some(u=>p.tags.includes(u))&&t.push(a)});const e=t.filter(a=>a.avgScore>=3);if(!e.length){N.innerHTML=`
    <li class="flex-grow-1 text-center">
      <p class="fs-4">沒有相似課程</p>
      <a href="./course.html" class="btn btn-primary">來去逛逛</a>
    </li>
    `;return}N.innerHTML=e.map(a=>`
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
    `).join(""),new H(".other-courses",{slidesPerView:1,spaceBetween:30,centeredSlides:!1,loop:!0,breakpoints:{992:{slidesPerView:3}},modules:[M,A],autoplay:{delay:3e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"}}),document.querySelectorAll(".others-favorite-btn").forEach(a=>{a.addEventListener("click",async c=>{c.preventDefault();const u=r.favorites.findIndex(L=>Number(L.courseId)===Number(c.target.dataset.id));if(u===-1)await g.add(l),a.classList.remove("outline-icon");else{const L=r.favorites[u].id;await g.remove(L),a.classList.add("outline-icon")}await k()})})}R();b.addEventListener("click",async s=>{s.stopPropagation();const t=r.favorites.findIndex(e=>Number(e.courseId)===Number(l));if(t===-1)await g.add(l);else{const e=r.favorites[t].id;await g.remove(e)}await k()});m.addEventListener("click",async s=>{if(!s.target.dataset.comment)return;const t=i.data.find(u=>u.id===Number(s.target.dataset.comment)),{id:e,likes:o,likesNum:a}=t;if(o.includes(r.id))return;o.push(r.id);const c={likes:o,likesNum:o.length};f.likeComment(e,c),$(await f.getComments(Number(s.target.dataset.link),6,d,"desc",e))});n.addEventListener("submit",s=>{if(s.preventDefault(),n["test-name"].classList.remove("is-invalid"),n["test-brand"].classList.remove("is-invalid"),n["test-name"].value.trim()||n["test-name"].classList.add("is-invalid"),n["test-brand"].value.trim()||n["test-brand"].classList.add("is-invalid"),![...n.querySelectorAll(".is-invalid")].length){if(n["test-name"].value.trim()!==p.title||n["test-brand"].value.trim()!==p.platform){n.reset(),S.fire({scrollbarPadding:!1,icon:"error",title:"回答錯誤,再找找答案吧"});return}if(!localStorage.getItem("token")){S.fire({scrollbarPadding:!1,icon:"error",title:"請加入會員",showConfirmButton:!1,timer:1500});return}j.addPasses({userId:r.id,courseId:Number(l),isFinish:!1}),C()}});h.forEach(s=>{s.addEventListener("click",async t=>{h.forEach(o=>o.classList.remove("active")),s.classList.add("active"),d=t.target.dataset.key,m.classList.add("justify-content-around"),m.innerHTML=`<li class="spinner-border m-0 text-success" role="status" style="width: 100px; height: 100px;">
    <span class="visually-hidden">Loading...</span>
  </li>`;const e=await f.getComments(1,6,d,"desc",l);$(e)})});
