import{S as w,U as E}from"./main-4c0e2c7d.js";import"./apply_course-d3ddfdd4.js";import{S as H}from"./swiper-core-19160206.js";import{N as M,A}from"./autoplay-054b67c1.js";import{l as L}from"./index-67a1f798.js";import{F as f}from"./favorites-13c837a1.js";import{C as g}from"./comment-0c515d44.js";import{P as B}from"./passes-6cca1e0b.js";import{C as N}from"./course-4f13abac.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";import"https://unpkg.com/@wangeditor/editor@latest/dist/index.js";const j=document.querySelector(".course-title section"),v=document.querySelector(".favorite-btn"),x=v.querySelector(".course-favorite-icon"),U=document.querySelector(".blackboard-mark"),F=document.querySelector(".course-cover"),D=document.querySelector(".course-scores"),O=document.querySelector(".course-tags"),o=document.querySelector(".course-test"),I=document.querySelector(".classroom-btn"),q=document.querySelector(".test-passed"),V=document.querySelector(".course-page-nav"),y=V.querySelectorAll("[data-key]"),$=document.querySelector(".comment-list"),p=document.querySelector(".pagination"),P=document.querySelector(".other-courses > ul"),b=new URLSearchParams(window.location.search),i=b.has("id")&&b.get("id"),m=b.has("sort")&&b.get("sort");let u,n,r;async function k(){if(!localStorage.getItem("token")){v.classList.add("d-none"),I.classList.add("d-none");return}r=await E.getUserInfo(),r&&(v.classList.remove("d-none"),r.favorites.find(e=>Number(e.courseId)===Number(i))?x.classList.remove("outline-icon"):x.classList.add("outline-icon"),r.passes.some(e=>Number(e.courseId)===Number(i))&&C())}async function R(){try{L(),await k(),u=await N.getCourse(i),n=await g.getComments(1,6,m,"desc",i),L(u),_(u),m==="timer"&&y[0].classList.add("active"),m==="likesNum"&&y[1].classList.add("active"),S(n),T(),z()}catch(e){console.log(e)}}function C(){o.classList.add("d-none"),q.classList.remove("d-none"),I.classList.remove("d-none")}function _(e){j.innerHTML=`
  <span class="bg-secondary text-white py-2 px-4 rounded-1 me-lg-3 me-2 mb-1 mb-lg-0">${e.platform}</span>
  <h1 class="page-title fs-lg-2 fs-4 fw-bold text-nowrap">
    ${e.title}
  </h1>
              `,U.setAttribute("href",e.url),F.setAttribute("src",e.cover);let t="";for(let s=1;s<=5;s++)t+=`<span class="fs-2 material-symbols-outlined ${s<=e.avgScore?"":"outline-icon"}">star</span>`;D.innerHTML=t,O.innerHTML=e.tags.map(s=>`<li class="border border-secondary p-1 px-3 rounded-5 small">${s}</li>`).join(""),q.innerHTML=`已經有 ${e.passes.length} 人通過測驗，趕快來進來交流吧！`}function S(e){if(!e.data.length){$.innerHTML='<p class="text-center fs-3 py-4">當前課程尚未評論</p>';return}$.innerHTML=e.data.map((t,s)=>{const l=t.user.email.split("@")[0],a=`${l[0]}***${l[l.length-1]}`;return`<li class="col-lg-4">
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
  </li>`}).join("")}function T(){if(!n.totalPages){p.innerHTML="";return}let e="";for(let s=1;s<=n.totalPages;s++)e+=`<li class="page-item p-hover ${n.currentPage===s?"active":""}"><a class="page-link" href="#" data-link="${s}">${s}</a></li>`;p.innerHTML=`
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
  </li>`,p.addEventListener("click",t);async function t(s){s.preventDefault(),s.stopPropagation(),s.target.dataset.link&&(p.removeEventListener("click",t),s.target.dataset.link&&(n=await g.getComments(Number(s.target.dataset.link),6,m,"desc",i)),S(n),T())}}async function z(){const e=await N.getAllCourses(),t=[];e.forEach(a=>{a.tags.some(d=>u.tags.includes(d))&&t.push(a)});const s=t.filter(a=>a.avgScore>=0);if(!s.length){P.innerHTML=`
    <li class="flex-grow-1 text-center">
      <p class="fs-4">沒有相似課程</p>
      <a href="./course.html" class="btn btn-primary">來去逛逛</a>
    </li>
    `;return}P.innerHTML=s.map(a=>`
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
    `).join(""),new H(".other-courses",{slidesPerView:1,spaceBetween:30,centeredSlides:!1,loop:!0,breakpoints:{992:{slidesPerView:3}},modules:[M,A],autoplay:{delay:3e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"}}),document.querySelectorAll(".others-favorite-btn").forEach(a=>{a.addEventListener("click",async c=>{c.preventDefault(),console.log(a);const d=r.favorites.findIndex(h=>Number(h.courseId)===Number(c.target.dataset.id));if(d===-1)await f.add(i),a.classList.remove("outline-icon");else{const h=r.favorites[d].id;await f.remove(h),a.classList.add("outline-icon")}await k()})})}R();v.addEventListener("click",async e=>{e.stopPropagation();const t=r.favorites.findIndex(s=>Number(s.courseId)===Number(i));if(t===-1)await f.add(i);else{const s=r.favorites[t].id;await f.remove(s)}await k(),console.log(r)});$.addEventListener("click",async e=>{if(!e.target.dataset.comment)return;const t=n.data.find(d=>d.id===Number(e.target.dataset.comment)),{id:s,likes:l,likesNum:a}=t;if(l.includes(r.id))return;l.push(r.id);const c={likes:l,likesNum:l.length};g.likeComment(s,c),S(await g.getComments(Number(e.target.dataset.link),6,m,"desc",s))});o.addEventListener("submit",e=>{if(e.preventDefault(),o["test-name"].classList.remove("is-invalid"),o["test-brand"].classList.remove("is-invalid"),o["test-name"].value.trim()||o["test-name"].classList.add("is-invalid"),o["test-brand"].value.trim()||o["test-brand"].classList.add("is-invalid"),![...o.querySelectorAll(".is-invalid")].length){if(o["test-name"].value.trim()!==u.title||o["test-brand"].value.trim()!==u.platform){o.reset(),w.fire({scrollbarPadding:!1,icon:"error",title:"回答錯誤,再找找答案吧"});return}if(!localStorage.getItem("token")){w.fire({scrollbarPadding:!1,icon:"error",title:"請加入會員",showConfirmButton:!1,timer:1500});return}B.addPasses({userId:r.id,courseId:Number(i),isFinish:!1}),C()}});y.forEach(e=>{e.addEventListener("click",t=>{location.search=`?id=${i}&sort=${t.target.dataset.key}`})});
