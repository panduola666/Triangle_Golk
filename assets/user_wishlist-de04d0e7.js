import"./main-c97ccc8c.js";import"./user_nav-b8e04adf.js";import{l as p}from"./index-9c62c766.js";import{F as m}from"./favorites-c1abf628.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";import"./course-70a6c6b8.js";const b=document.querySelector(".book-left"),y=document.querySelector(".boot-right"),f=document.querySelector(".pc-marks"),g=document.querySelector(".h5-marks");let v,r,c;async function $(){try{p(),v=await m.getUserFavorites(),r=v.reduce((t,s)=>(t[s.course.platform]?t[s.course.platform].push(s):t.其他平台.push(s),t),{六角學院:[],Hahow:[],Udemy:[],Coursera:[],其他平台:[]}),p(r),c=Object.keys(r)[0],i(u(r,1,c)),d()}catch(t){console.log(t)}}$();function i(t){const{currentPage:s,totalPages:e,data:n}=t;b.innerHTML=`
    <div class="notebook-cards-group">
    ${n[0].map(a=>`
    <div class="notebook-card-frame">
        <div class="card wishlist-note-card mb-3">
        <div class="row g-0">
            <div class="col-4 card-row">
            <img src="${a.course.cover}" class="img-fluid rounded-start" alt="${a.course.title}">
            </div>
            <div class="col-8">
            <div class="card-body pb-1">
                <h2 class="card-title fs-6 text-truncate">${a.course.title}</h2>
                <div class="user-courses-tags mb-2 mb-lg-3">
                ${a.course.tags.map(o=>`<span class="card-text me-2 fs-8">#${o}</span>`).join("")}
                </div>
                <div class="stars d-flex justify-content-end">
                <div class="stars-icon text-primary me-1 me-md-2">
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=1?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=2?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=3?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=4?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=5?"":"outline-icon"}">star</span>
                </div>
                <span class="text-gray-400 small">(${a.totalComment})</span>
                </div>
            </div>
            </div>
            <div class="wishlist-note-card-btn d-flex justify-content-center flex-nowrap">
            <a href="./coursepages.html?id=${a.courseId}&sort=timer" target="_self" class="d-block text-white fs-5 align-self-center text-nowrap p-xxl">查看課程</a>
            </div>
        </div>
        </div>
    </div>
    `).join("")}
    </div>
    <div class="d-none ${e?"d-lg-block":""} justify-content-lg-start">
      <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===1?"d-none":""}" data-page="${s-1}">上一頁</button>
    </div>
    `,y.innerHTML=`
    <div class="notebook-cards-group">
    ${n[1].map(a=>`
    <div class="notebook-card-frame">
        <div class="card wishlist-note-card mb-3">
        <div class="row g-0">
            <div class="col-4 card-row">
            <img src="${a.course.cover}" class="img-fluid rounded-start" alt="${a.course.title}">
            </div>
            <div class="col-8">
            <div class="card-body pb-1">
                <h2 class="card-title fs-6 text-truncate">${a.course.title}</h2>
                <div class="user-courses-tags mb-2 mb-lg-3">
                ${a.course.tags.map(o=>`<span class="card-text me-2 fs-8">#${o}</span>`).join("")}
                </div>
                <div class="stars d-flex justify-content-end">
                <div class="stars-icon text-primary me-1 me-md-2">
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=1?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=2?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=3?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=4?"":"outline-icon"}">star</span>
                    <span class="material-symbols-outlined star-fs ${a.avgScore>=5?"":"outline-icon"}">star</span>
                </div>
                <span class="text-gray-400 small">(${a.totalComment})</span>
                </div>
            </div>
            </div>
            <div class="wishlist-note-card-btn d-flex justify-content-center flex-nowrap">
            <a href="./coursepages.html?id=${a.courseId}&sort=timer" target="_self" class="d-block text-white fs-5 align-self-center text-nowrap p-xxl">查看課程</a>
            </div>
        </div>
        </div>
    </div>
    `).join("")}
    </div>
    <div class="d-flex justify-content-between justify-content-lg-end ${e?"":"d-none"}">
      <div class="d-lg-none">
        <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===1?"d-none":""}" data-page="${s-1}">上一頁</button>
      </div>
      <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===e?"d-none":""}" data-page="${s+1}">下一頁</button>
    </div>
    `}function d(){const t=["teal","blue","orange","yellow","gray-200"];f.innerHTML=Object.keys(r).map((s,e)=>`<li class="bookmark ${c===s?"":"bookmark-unselected"} mb-2 py-1 bg-${t[e]} cur-point" data-tag="${s}">
      <span class="fs-tiny"> ${s}(${r[s].length})</span>
        </li>`).join(""),g.innerHTML=Object.keys(r).map((s,e)=>` <li class="bookmark ${c===s?"":"bookmark-unselected"} me-1 py-1 bg-${t[e]} fs-tiny cur-point" data-tag="${s}">
      ${s}(${r[s].length})
    </li>`).join("")}function u(t,s=1,e,n=8){const a=Math.ceil(t[e].length/n),o=t[e];return s<1?{totalPages:a,currentPage:s,data:l(o.slice(0,n))}:s>a?{totalPages:a,currentPage:s,data:l(o.slice(o.length-n))}:{totalPages:a,currentPage:s,data:l(o.slice(s*n-n,s*n))}}function l(t){return[t.slice(0,4),t.slice(4)]}f.addEventListener("click",t=>{t.target.dataset.tag&&(c=t.target.dataset.tag,i(u(r,1,c)),d())});g.addEventListener("click",t=>{t.target.dataset.tag&&(c=t.target.dataset.tag,i(u(r,1,c)),d())});
