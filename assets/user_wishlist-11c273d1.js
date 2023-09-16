import"./main-6c126296.js";import"./user_nav-b8e04adf.js";import{l as m}from"./index-00c34100.js";import{F as b}from"./favorites-a706b415.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";import"./course-0f83fb1f.js";const x=document.querySelector(".notebook"),f=document.querySelector(".book-left"),g=document.querySelector(".boot-right"),y=document.querySelector(".pc-marks"),$=document.querySelector(".h5-marks");let v,e,r,p;async function w(){try{m(),await h(),m(e),r=Object.keys(e)[0],l(i(e,1,r)),d()}catch(a){console.log(a)}}w();async function h(){v=await b.getUserFavorites(),e=v.reduce((a,s)=>(a[s.course.platform]?a[s.course.platform].push(s):a.其他平台.push(s),a),{六角學院:[],Hahow:[],Udemy:[],Coursera:[],其他平台:[]})}x.addEventListener("click",a=>{const{page:s}=a.target.dataset;s&&(p=Number(s),l(i(e,p,r)))});function l(a){const{currentPage:s,totalPages:n,data:o}=a;f.innerHTML=`
    <div id="user-list-empty1" class="user-empty comment-style1 ${o[0].length?"d-none":""}">
      <p class="fs-4 fw-bold mb-4 text-white text-center"
      >本頁還沒有內容喔</p>
      <a href="course.html" class="btn btn-outline-primary fs-3 fw-bold d-block"
      >出發探索好課</a>
    </div>
    <div class="notebook-cards-group">
    ${o[0].map(t=>`
    <div class="notebook-card-frame">
        <div class="card wishlist-note-card mb-3">
          <span data-id="${t.id}" class="remove-wishlist material-symbols-outlined outline-icon">heart_minus
          </span>
        <div class="row g-0">
            <div class="col-4 card-row">
            <img src="${t.course.cover}" class="img-fluid rounded-start" alt="${t.course.title}">
            </div>
            <div class="col-8">
            <div class="card-body pb-1">
                <h2 class="card-title fs-6 text-truncate">${t.course.title}</h2>
                <div class="user-courses-tags d-flex gap-2 mb-2 mb-lg-3">
                ${t.course.tags.map(c=>`<span class="card-text fs-8">#${c}</span>`).join("")}
                </div>
                <div class="stars d-flex justify-content-end">
                <div class="stars-icon text-primary me-1 me-md-2">
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=1?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=2?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=3?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=4?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=5?"":"outline-icon"}">star</span>
                </div>
                <span class="text-gray-400 small">(${t.totalComment})</span>
                </div>
            </div>
            </div>
            <a href="coursepages.html?id=${t.courseId}&sort=timer" class="wishlist-note-card-btn d-flex text-white fs-5 align-items-center justify-content-around text-nowrap">
            查看課程
            </a>
        </div>
        </div>
    </div>
    `).join("")}
    </div>
    <div class="d-none ${n?"d-lg-block":""} justify-content-lg-start">
      <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===1?"d-none":""}" data-page="${s-1}">上一頁</button>
    </div>
    `,g.innerHTML=`
    <div class="notebook-cards-group">
    ${o[1].map(t=>`
    <div class="notebook-card-frame">
        <div class="card wishlist-note-card mb-3">
          <span data-id="${t.id}" class="remove-wishlist material-symbols-outlined outline-icon">heart_minus
          </span>
        <div class="row g-0">
            <div class="col-4 card-row">
            <img src="${t.course.cover}" class="img-fluid rounded-start" alt="${t.course.title}">
            </div>
            <div class="col-8">
            <div class="card-body pb-1">
                <h2 class="card-title fs-6 text-truncate">${t.course.title}</h2>
                <div class="user-courses-tags d-flex gap-2 mb-2 mb-lg-3">
                ${t.course.tags.map(c=>`<span class="card-text fs-8">#${c}</span>`).join("")}
                </div>
                <div class="stars d-flex justify-content-end">
                <div class="stars-icon text-primary me-1 me-md-2">
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=1?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=2?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=3?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=4?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${t.avgScore>=5?"":"outline-icon"}">star</span>
                </div>
                <span class="text-gray-400 small">(${t.totalComment})</span>
                </div>
            </div>
            </div>
            <a href="coursepages.html?id=${t.courseId}&sort=timer" class="wishlist-note-card-btn d-flex text-white fs-5 align-items-center justify-content-around text-nowrap">
            查看課程
            </a>
        </div>
        </div>
    </div>
    `).join("")}
    </div>
    <div class="d-flex justify-content-between justify-content-lg-end ${n?"":"d-none"}">
      <div class="d-lg-none">
        <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===1?"d-none":""}" data-page="${s-1}">上一頁</button>
      </div>
      <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===n?"d-none":""}" data-page="${s+1}">下一頁</button>
    </div>
    `}function d(){const a=["teal","blue","orange","yellow","gray-200"];y.innerHTML=Object.keys(e).map((s,n)=>`<li class="bookmark ${r===s?"":"bookmark-unselected"} mb-2 py-1 bg-${a[n]} cur-point" data-tag="${s}">
      <span class="fs-tiny"> ${s}(${e[s].length})</span>
        </li>`).join(""),$.innerHTML=Object.keys(e).map((s,n)=>` <li class="bookmark ${r===s?"":"bookmark-unselected"} me-1 py-1 bg-${a[n]} fs-tiny cur-point" data-tag="${s}">
      <span class="d-block text-nowrap">${s}</span>(${e[s].length})
    </li>`).join("")}function i(a,s=1,n,o=8){const t=Math.ceil(a[n].length/o),c=a[n];return console.log(c),s<1?{totalPages:t,currentPage:s>=t?t:s,data:u(c.slice(0,o))}:s>t?{totalPages:t,currentPage:s>=t?t:s,data:u(c.slice(c.length-o))}:{totalPages:t,currentPage:s>=t?t:s,data:u(c.slice(s*o-o,s*o))}}function u(a){return[a.slice(0,4),a.slice(4)]}y.addEventListener("click",a=>{a.target.dataset.tag&&(r=a.target.dataset.tag,l(i(e,1,r)),d())});$.addEventListener("click",a=>{a.target.dataset.tag&&(r=a.target.dataset.tag,l(i(e,1,r)),d())});f.addEventListener("click",k);g.addEventListener("click",k);async function k(a){const{id:s}=a.target.dataset;s&&(b.remove(s),await h(),l(i(e,p,r)),d())}
