import{U as k}from"./main-20e5e0cf.js";import{C as x}from"./course-fe90b3c4.js";import{F as y}from"./favorites-ff1c6920.js";const r=document.querySelector(".filter-form"),q=document.querySelector("#delete-btn"),f=document.querySelector(".favorite"),b=document.querySelectorAll(".sort-btn"),L=document.querySelectorAll(".sort-item-btn"),d=document.querySelector(".pagination"),E=document.querySelectorAll(".content-filter"),$=document.querySelectorAll(".sort-filter"),g=6;let o=1,S=0,p;const l={sort:"正序",content:"全部"};async function I(){try{const e=new URLSearchParams(window.location.search),s=e.has("platform")?e.getAll("platform"):[],t=e.has("q")?e.get("q"):"";r["search-bar"].value=t,r.querySelectorAll("input[type=checkbox]").forEach(a=>{a.checked=s.includes(a.value)}),i(1),await h(),w()}catch(e){console.log(e)}}I();async function h(){if(!localStorage.getItem("token")){f&&f.classList.add("d-none");return}if(p=await k.getUserInfo(),!p)return;document.querySelectorAll(".favorite").forEach(s=>{const t=s.dataset.id;p.favorites.find(a=>Number(a.courseId)===Number(t))?s.classList.remove("outline-icon"):s.classList.add("outline-icon")}),f&&f.classList.remove("d-none")}async function i(e){const s=document.querySelector(".course-list"),t=await x.getAllCourses();switch(l.content){case"全部":t.sort((n,c)=>l.sort!=="正序"?c.id-n.id:n.id-c.id);break;case"評價數":t.sort((n,c)=>l.sort!=="正序"?n.comments.length-c.comments.length:c.comments.length-n.comments.length);break;default:t.sort((n,c)=>l.sort!=="正序"?n.avgScore-c.avgScore:c.avgScore-n.avgScore);break}S=t.length;const a=(e-1)*g,u=a+g;let v="";const m=t.slice(a,u);m.length?m.forEach(n=>{v+=`<li class="col-lg-4 col-md-6 col-12 d-flex flex-column">
      <a class="card card-hover h-100 rounded-4" href="./coursepages.html?id=${n.id}&sort=timer">
        <div class="pic">
          <img
            src="${n.cover}"
            alt="${n.title}"
            class="card-pic"
          />
        </div>
        <div
          class="badge d-flex justify-content-between align-items-center position-absolute"
        >
          <span
            class="brand bg-secondary small text-white rounded-1 py-1 px-3"
            >${n.platform}</span
          >
          <span
            class="${localStorage.getItem("token")?"":"d-none"} favorite material-symbols-outlined outline-icon position-absolute" data-id="${n.id}"
            >favorite</span
          >
        </div>
        <div class="card-body">
          <h3 class="title text-secondary fs-6 fw-bold">
            ${n.title}
          </h3>
        </div>
        <div class="card-footer">
          <div class="tags mb-2 mt-auto">
          ${n.tags.map(c=>`<span class="fs-8 me-2">#${c}</span>`).join("")}
          </div>
          <div class="stars d-flex">
            <div class="stars-icon text-primary me-2">
            <span class="material-symbols-outlined ${n.avgScore>=1?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${n.avgScore>=2?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${n.avgScore>=3?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${n.avgScore>=4?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${n.avgScore>=5?"":"outline-icon"}"
                >star</span
              >
            </div>
            <span class="fs-8 text-gray-400">(${n.comments.length})</span>
          </div>
        </div>
      </a>
    </li>`}):v=`
    <li class="pt-5 text-center">
      <h3 class="mb-4 h1">暫無相關課程</h3>
      <button type="button" class="btn btn-primary btn-lg need-apply">申請新課</button>
    </li>
    `,s.innerHTML=v,m.length||document.querySelector(".need-apply").addEventListener("click",()=>{document.querySelector(".apply-btn").click()}),P(),await h()}b.forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const{sort:t=""}=e.dataset;b.forEach(a=>{a.classList.remove("btn-secondary"),a.classList.remove("active"),a.classList.add("btn-outline-secondary")}),l.sort=t,e.classList.remove("btn-outline-secondary"),e.classList.add("btn-secondary"),i(o)})});L.forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const{content:t=""}=e.dataset;L.forEach(a=>{a.classList.remove("btn-secondary"),a.classList.remove("active"),a.classList.add("btn-outline-secondary")}),l.content=t,e.classList.add("btn-secondary"),e.classList.add("active"),e.classList.remove("btn-outline-secondary"),i(o)})});function w(){d.addEventListener("click",e=>{if(e.preventDefault(),e.target.classList.contains("page-link")){const s=parseInt(e.target.dataset.page);isNaN(s)||(o=s,i(o))}})}function P(){const e=Math.ceil(S/g);d.innerHTML="",o>1&&(d.innerHTML+=`
      <li class="page-item page-prev p-hover">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `);for(let a=1;a<=e;a++){const u=a===o?"active":"";d.innerHTML+=`
      <li class="page-item p-hover ${u}">
        <a class="page-link" href="#" data-page="${a}">${a}</a>
      </li>
    `}o<e&&(d.innerHTML+=`
      <li class="page-item page-next p-hover">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `);const s=d.querySelector(".page-prev");s&&s.addEventListener("click",()=>{o>1&&(o--,i(o))});const t=d.querySelector(".page-next");t&&t.addEventListener("click",()=>{o<e&&(o++,i(o))})}r.addEventListener("submit",e=>{e.preventDefault();const s=r.querySelectorAll('input[type="checkbox"]'),t=[];s.forEach(function(u){u.checked&&t.push(`platform=${u.value}`)});let a="?";a+=t.join("&"),r["search-bar"].value&&(a+=`${t.length?"&":""}q=${r["search-bar"].value}`),location.href=`course.html${a==="?"?"":a}`});q.addEventListener("click",e=>{e.preventDefault(),r["search-bar"].value="",r.querySelectorAll('input[type="checkbox"]').forEach(function(t){t.checked=!1})});document.querySelector(".course-list").addEventListener("click",async e=>{if(e.target.classList.contains("favorite")){e.preventDefault();const s=e.target.dataset.id;if(!s)return;const t=p.favorites.findIndex(a=>Number(a.courseId)===Number(s));if(t===-1)await y.add(s),e.target.classList.remove("outline-icon");else{const a=p.favorites[t].id;await y.remove(a),e.target.classList.add("outline-icon")}await h()}});E.forEach(e=>{e.addEventListener("click",s=>{s.preventDefault();const t=s.target.dataset.content;l.content=t,i(o),document.getElementById("selectedContent").textContent=t})});$.forEach(e=>{e.addEventListener("click",s=>{s.preventDefault();const t=s.target.dataset.sort;l.sort=t,i(o),document.getElementById("selectedSort").textContent=t})});
