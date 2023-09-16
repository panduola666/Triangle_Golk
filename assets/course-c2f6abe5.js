import{U as k}from"./main-6c126296.js";import{C as x}from"./course-0f83fb1f.js";import{F as y}from"./favorites-a706b415.js";const r=document.querySelector(".filter-form"),q=document.querySelector("#delete-btn"),f=document.querySelector(".favorite"),b=document.querySelectorAll(".sort-btn"),L=document.querySelectorAll(".sort-item-btn"),l=document.querySelector(".pagination"),g=6;let o=1,S=0,p;const d={sort:"正序",content:"全部"};async function $(){try{const e=new URLSearchParams(window.location.search),s=e.has("platform")?e.getAll("platform"):[],a=e.has("q")?e.get("q"):"";r["search-bar"].value=a,r.querySelectorAll("input[type=checkbox]").forEach(t=>{t.checked=s.includes(t.value)}),u(1),await h(),E()}catch(e){console.log(e)}}$();async function h(){if(!localStorage.getItem("token")){f&&f.classList.add("d-none");return}if(p=await k.getUserInfo(),!p)return;document.querySelectorAll(".favorite").forEach(s=>{const a=s.dataset.id;p.favorites.find(t=>Number(t.courseId)===Number(a))?s.classList.remove("outline-icon"):s.classList.add("outline-icon")}),f&&f.classList.remove("d-none")}async function u(e){const s=document.querySelector(".course-list"),a=await x.getAllCourses();switch(d.content){case"全部":a.sort((n,c)=>d.sort!=="正序"?c.id-n.id:n.id-c.id);break;case"評價數":a.sort((n,c)=>d.sort!=="正序"?n.comments.length-c.comments.length:c.comments.length-n.comments.length);break;default:a.sort((n,c)=>d.sort!=="正序"?n.avgScore-c.avgScore:c.avgScore-n.avgScore);break}S=a.length;const t=(e-1)*g,i=t+g;let v="";const m=a.slice(t,i);m.length?m.forEach(n=>{v+=`<li class="col-lg-4 col-md-6 col-12 d-flex flex-column">
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
    `,s.innerHTML=v,m.length||document.querySelector(".need-apply").addEventListener("click",()=>{document.querySelector(".apply-btn").click()}),I(),await h()}b.forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const{sort:a=""}=e.dataset;b.forEach(t=>{t.classList.remove("btn-secondary"),t.classList.remove("active"),t.classList.add("btn-outline-secondary")}),d.sort=a,e.classList.remove("btn-outline-secondary"),e.classList.add("btn-secondary"),u(o)})});L.forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const{content:a=""}=e.dataset;L.forEach(t=>{t.classList.remove("btn-secondary"),t.classList.remove("active"),t.classList.add("btn-outline-secondary")}),d.content=a,e.classList.add("btn-secondary"),e.classList.add("active"),e.classList.remove("btn-outline-secondary"),u(o)})});function E(){l.addEventListener("click",e=>{if(e.preventDefault(),e.target.classList.contains("page-link")){const s=parseInt(e.target.dataset.page);isNaN(s)||(o=s,u(o))}})}function I(){const e=Math.ceil(S/g);l.innerHTML="",o>1&&(l.innerHTML+=`
      <li class="page-item page-prev p-hover">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `);for(let t=1;t<=e;t++){const i=t===o?"active":"";l.innerHTML+=`
      <li class="page-item p-hover ${i}">
        <a class="page-link" href="#" data-page="${t}">${t}</a>
      </li>
    `}o<e&&(l.innerHTML+=`
      <li class="page-item page-next p-hover">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `);const s=l.querySelector(".page-prev");s&&s.addEventListener("click",()=>{o>1&&(o--,u(o))});const a=l.querySelector(".page-next");a&&a.addEventListener("click",()=>{o<e&&(o++,u(o))})}r.addEventListener("submit",e=>{e.preventDefault();const s=r.querySelectorAll('input[type="checkbox"]'),a=[];s.forEach(function(i){i.checked&&a.push(`platform=${i.value}`)});let t="?";t+=a.join("&"),r["search-bar"].value&&(t+=`${a.length?"&":""}q=${r["search-bar"].value}`),location.href=`course.html${t==="?"?"":t}`});q.addEventListener("click",e=>{e.preventDefault(),r["search-bar"].value="",r.querySelectorAll('input[type="checkbox"]').forEach(function(a){a.checked=!1})});document.querySelector(".course-list").addEventListener("click",async e=>{if(e.target.classList.contains("favorite")){e.preventDefault();const s=e.target.dataset.id;if(!s)return;const a=p.favorites.findIndex(t=>Number(t.courseId)===Number(s));if(a===-1)await y.add(s),e.target.classList.remove("outline-icon");else{const t=p.favorites[a].id;await y.remove(t),e.target.classList.add("outline-icon")}await h()}});
