import{U as p}from"./footer-051867de.js";import"./user_nav-b8e04adf.js";import{C as y}from"./comment-5bbfda29.js";import{P as $}from"./passes-8eb86309.js";const g=document.querySelector(".comment-modal"),v=document.querySelectorAll(".modal-btn");let i,d,m;async function h(){try{i=await $.getUserPasses(),d=await p.getUserInfo(),m=i.reduce((s,t)=>{const e={...t,comment:d.comments.find(a=>a.courseId===t.courseId)||{}};return s[t.course.platform]?s[t.course.platform].push(e):s[t.course.platform]=[e],s},{});const n=P(m,1,3);console.log(n)}catch(n){console.log(n)}}h();console.log(i);function P(n,s=1,t=2,e="六角學院"){const a=Math.ceil(n[e].length/t),o=n[e];return s<1?(console.log("已經在第一頁"),{totalPages:a,currentPage:s,data:o.slice(0,t)}):s>a?(console.log("已經最後一頁"),{totalPages:a,currentPage:s,data:o.slice(o.length-t)}):{totalPages:a,currentPage:s,data:o.slice(s*t-t,s*t)}}v.forEach(n=>{n.addEventListener("click",async s=>{const t=await y.getCurrent(n.dataset.id),{id:e,score:a,showName:o,user:r,content:u,canEdit:f,failContent:b,isPassed:l}=t,c=r.email.slice(0,r.email.indexOf("@"));g.innerHTML=`
       <article class="modal-content bg-secondary text-primary fw-bold comment-style1">
      <div class="translate-middle-y">
        <button class="btn btn-outline-primary rounded-circle float-end" data-bs-dismiss="modal">X</button>
      </div>
      <div>
        <div class="stars-icon d-flex text-primary float-end">
            <span class="material-symbols-outlined ${a>=1?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${a>=2?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${a>=3?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${a>=4?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${a>=5?"":"outline-icon"}">star</span>
        </div>
          <p class="fs-5">${o?r.nickName:`${c[0]}***${c[c.length-1]}`}：</p>
      </div>
      <div class="fs-4 mb-0">${u}</div>
      <div>
        <!-- 課程審核進度 -->
        ${l===-1?'<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">審核中</button>':l===0?`<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">${b}</button>`:""}
        <!-- 編輯 icon -->
        ${f&&l!==-1?`<a href="./comment.html?id=${e}" class="material-symbols-outlined outline-icon cur-point ${l===1&&"float-end"}">edit_square</a>`:""}
      </div>
    </article>`})});
