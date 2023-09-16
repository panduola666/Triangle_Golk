import{U as x}from"./main-20e5e0cf.js";import"./user_nav-b8e04adf.js";import{l as v}from"./index-64ae5ba6.js";import{C as w}from"./comment-2e7060f2.js";import{P as S}from"./passes-825c0143.js";import"https://cdn.jsdelivr.net/npm/aos@2.3.4/+esm";import"./avatars-b957534f.js";import"./course-fe90b3c4.js";const j=document.querySelector(".notebook"),P=document.querySelector(".book-left"),L=document.querySelector(".boot-right"),M=document.querySelector(".comment-modal"),y=document.querySelector(".pc-marks"),$=document.querySelector(".h5-marks");let g,f,o,l;async function q(){try{v(),g=await S.getUserPasses(),f=await x.getUserInfo(),o=g.reduce((a,s)=>{const e={...s,comment:f.comments.find(n=>n.courseId===s.courseId)||{}};return a[s.course.platform]?a[s.course.platform].push(e):a.其他平台.push(e),s.isFinish&&a.已完課.push(e),a},{六角學院:[],Hahow:[],Udemy:[],Coursera:[],其他平台:[],已完課:[]}),v(o),l=Object.keys(o)[0],d(u(o,1,l)),p()}catch(a){console.log(a)}}q();j.addEventListener("click",a=>{const{page:s}=a.target.dataset;s&&d(u(o,Number(s),l))});function d(a){const{currentPage:s,totalPages:e,data:n}=a;P.innerHTML=`
    <div id="user-list-empty0" class="user-empty comment-style1 ${n[0].length?"d-none":""}">
      <p class="fs-4 fw-bold mb-4 text-white text-center"
      >本頁還沒有內容喔</p>
      <a href="course.html" class="btn btn-outline-primary fs-3 fw-bold d-block"
      >出發探索好課</a>
    </div>
  <div class="notebook-cards-group">
  ${n[0].map(t=>`
  <div class="notebook-card-frame position-relative">
    <span class="comment-alerttag bg-danger small text-white rounded-1 py-1 px-3 position-absolute ${t.comment.isPassed!==0?"d-none":""}">未過審</span>
    <div class="card single-note-card mb-3">
    <div class="row g-0">
      <div class="col-4 card-row">
        <img src="${t.course.cover}" class="img-fluid rounded-start" alt="${t.course.title}">
      </div>
      <div class="col-8">
        <div class="card-body pb-1">
          <h2 class="card-title fs-6 text-truncate">${t.course.title}</h2>
          <div class="user-courses-tags d-flex flex-wrap gap-2 mb-2 mb-lg-3">
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
      <div class="single-note-card-btn d-flex justify-content-evenly align-items-center">
        <button class="check-course btn btn-primary "><a href="./coursepages.html?id=${t.course.id}&sort=timer">查看課程</a></button>
        <div class="vertical-line"></div>
        <button class="go-comment btn btn-outline-primary ${t.comment.id?"d-none":"d-block"}">
          <a href="./comment.html?courseId=${t.courseId}">完課評價</a>
        </button>
        <button type="button" class="btn btn-secondary modal-btn ${t.comment.id?"d-block":"d-none"}" data-bs-toggle="modal" data-bs-target="#course-comment" data-id="${t.comment.id}">
        我的評價
      </button>
      </div>
    </div>
    </div>
  </div>
  `).join("")}
  </div>
  <div class="d-none ${e?"d-lg-block":""} justify-content-lg-start">
    <button class="btn btn-secondary px-2 py-1 mt-3 small ${s===1?"d-none":""}" data-page="${s-1}">上一頁</button>
  </div>
  `,L.innerHTML=`
  <div class="notebook-cards-group">
  ${n[1].map(t=>`
  <div class="notebook-card-frame position-relative">
    <span class="comment-alerttag bg-danger small text-white rounded-1 py-1 px-3 position-absolute ${t.comment.isPassed!==0?"d-none":""}">未過審</span>
    <div class="card single-note-card mb-3">
    <div class="row g-0">
      <div class="col-4 card-row">
        <img src="${t.course.cover}" class="img-fluid rounded-start" alt="${t.course.title}">
      </div>
      <div class="col-8">
        <div class="card-body pb-1">
          <h2 class="card-title fs-6 text-truncate">${t.course.title}</h2>
          <div class="user-courses-tags d-flex flex-wrap gap-2 mb-2 mb-lg-3">${t.course.tags.map(c=>`<span class="card-text fs-8">#${c}</span>`).join("")}</div>
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
      <div class="single-note-card-btn d-flex justify-content-evenly align-items-center">
        <button class="check-course btn btn-primary "><a href="./coursepages.html?id=${t.course.id}&sort=timer">查看課程</a></button>
        <div class="vertical-line"></div>
        <button class="go-comment btn btn-outline-primary ${t.comment.id?"d-none":"d-block"}">
          <a href="./comment.html?courseId=${t.courseId}">完課評價</a>
        </button>
        <button type="button" class="btn btn-secondary modal-btn ${t.comment.id?"d-block":"d-none"}" data-bs-toggle="modal" data-bs-target="#course-comment" data-id="1">
        我的評價
      </button>
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
  `,document.querySelectorAll(".modal-btn").forEach(t=>{t.addEventListener("click",()=>C(t))})}function p(){const a=["teal","blue","orange","yellow","gray-200","primary"];y.innerHTML=Object.keys(o).map((s,e)=>`<li class="bookmark ${l===s?"":"bookmark-unselected"} mb-2 py-1 bg-${a[e]} cur-point" data-tag="${s}">
    <span class="fs-tiny">${s}(${o[s].length})</span>
      </li>`).join(""),$.innerHTML=Object.keys(o).map((s,e)=>` <li class="bookmark ${l===s?"":"bookmark-unselected"} ${s==="已完課"?"ms-auto":"me-1"} py-1 bg-${a[e]} fs-tiny cur-point" data-tag="${s}">
    <span class="d-block text-nowrap">${s}</span>(${o[s].length})
  </li>`).join("")}async function C(a){const s=await w.getCurrent(a.dataset.id),{id:e,score:n,showName:r,user:t,content:c,canEdit:h,failContent:k,isPassed:i}=s,m=t.email.slice(0,t.email.indexOf("@"));M.innerHTML=`
     <article class="modal-content bg-secondary text-primary fw-bold comment-style1">
    <div class="translate-middle-y">
      <button class="btn btn-outline-primary rounded-circle float-end" data-bs-dismiss="modal">X</button>
    </div>
    <div>
      <div class="stars-icon d-flex text-primary float-end">
          <span class="material-symbols-outlined ${n>=1?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${n>=2?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${n>=3?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${n>=4?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${n>=5?"":"outline-icon"}">star</span>
      </div>
        <p class="fs-5">${r?t.nickName:`${m[0]}***${m[m.length-1]}`}：</p>
    </div>
    <div class="fs-4 mb-0">${c}</div>
    <div>
      ${i===-1?'<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">審核中</button>':i===0?`<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">${k}</button>`:""}
      <!-- 編輯 icon -->
      ${h&&i!==-1?`<a href="./comment.html?id=${e}" class="material-symbols-outlined outline-icon cur-point ${i===1&&"float-end"}">edit_square</a>`:""}
    </div>
  </article>`}function u(a,s=1,e,n=8){const r=Math.ceil(a[e].length/n),t=a[e];return s<1?{totalPages:r,currentPage:s,data:b(t.slice(0,n))}:s>r?{totalPages:r,currentPage:s,data:b(t.slice(t.length-n))}:{totalPages:r,currentPage:s,data:b(t.slice(s*n-n,s*n))}}function b(a){return[a.slice(0,4),a.slice(4)]}y.addEventListener("click",a=>{a.target.dataset.tag&&(l=a.target.dataset.tag,d(u(o,1,l)),p())});$.addEventListener("click",a=>{a.target.dataset.tag&&(l=a.target.dataset.tag,d(u(o,1,l)),p())});
