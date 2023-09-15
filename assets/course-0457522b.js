import{U as h}from"./main-b77ea123.js";import{C as y}from"./course-0ae1a782.js";document.querySelector("#search-bar");document.querySelector("#delete-btn");document.querySelector("#search-btn");const l=document.querySelector(".favorite");async function b(){try{c(1),await $(),x()}catch(e){console.log(e)}}b();async function $(){try{localStorage.getItem("token")?l&&l.forEach(e=>{e.classList.remove("d-none")}):l&&l.forEach(e=>{e.classList.add("d-none")})}catch(e){console.log(e)}await h.getUserInfo()}async function c(e){const s=document.querySelector(".course-list"),o=await y.getAllCourses();i=o.length;const p=(e-1)*r,v=p+r;let u="";o.slice(p,v).forEach(a=>{u+=`<li class="col-lg-4 col-md-6 col-12 d-flex flex-column">
    <a class="card card-hover h-100 rounded-4" href="./coursepages.html?id=${a.id}&sort=timer">
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
          class="${localStorage.getItem("token")?"":"d-none"} favorite text-white material-symbols-outlined outline-icon position-absolute" data-id="${a.id}"
          >favorite</span
        >
      </div>
      <div class="card-body">
        <h3 class="title text-secondary fs-6 fw-bold">
          ${a.title}
        </h3>
      </div>
      <div class="card-footer">
        <div class="tags mb-2 mt-auto">
        ${a.tags.map(m=>`<span class="fs-8 me-2">#${m}</span>`).join("")}
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
  </li>`}),s.innerHTML=u,d()}const n=document.querySelector(".pagination"),g=document.querySelector(".page-prev"),f=document.querySelector(".page-next"),r=6;let t=1,i=0;function x(){n.addEventListener("click",e=>{if(e.preventDefault(),e.target.classList.contains("page-link")){const s=parseInt(e.target.dataset.page);isNaN(s)||(t=s,c(t))}})}g.addEventListener("click",e=>{e.preventDefault(),t>1&&(t--,c(t)),d()});f.addEventListener("click",e=>{e.preventDefault();const s=Math.ceil(i/r);t<s&&(t++,c(t)),d()});function d(){const e=Math.ceil(i/r);n.innerHTML="",t>1&&(n.innerHTML+=`
      <li class="page-item page-prev p-hover">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `);for(let s=1;s<=e;s++){const o=s===t?"active":"";n.innerHTML+=`
      <li class="page-item p-hover ${o}">
        <a class="page-link" href="#" data-page="${s}">${s}</a>
      </li>
    `}t<e&&(n.innerHTML+=`
      <li class="page-item page-next p-hover">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `),g.classList.toggle("active",t!==1),f.classList.toggle("d-none",t===e)}
