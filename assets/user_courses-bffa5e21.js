import"./footer-593f08a3.js";import{C as r}from"./comment-5b611eab.js";const u=document.querySelector(".comment-modal"),b=document.querySelectorAll(".modal-btn");b.forEach(e=>{e.addEventListener("click",async p=>{const o=await r.getCurrent(e.dataset.id),{id:l,score:t,showName:i,user:a,content:d,canEdit:c,failContent:m,isPassed:s}=o,n=a.email.slice(0,a.email.indexOf("@"));u.innerHTML=`
       <article class="modal-content bg-secondary text-primary fw-bold comment-style1">
      <div class="translate-middle-y">
        <button class="btn btn-outline-primary rounded-circle float-end" data-bs-dismiss="modal">X</button>
      </div>
      <div>
        <div class="stars-icon d-flex text-primary float-end">
            <span class="material-symbols-outlined ${t>=1?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${t>=2?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${t>=3?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${t>=4?"":"outline-icon"}">star</span>
            <span class="material-symbols-outlined ${t>=5?"":"outline-icon"}">star</span>
        </div>
          <p class="fs-5">${i?a.nickName:`${n[0]}***${n[n.length-1]}`}：</p>
      </div>
      <div class="fs-4 mb-0">${d}</div>
      <div>
        <!-- 課程審核進度 -->
        ${s===-1?'<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">審核中</button>':s===0?`<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">${m}</button>`:""}
        <!-- 編輯 icon -->
        ${c&&s!==-1?`<a href="./comment.html?id=${l}" class="material-symbols-outlined outline-icon cur-point ${s===1&&"float-end"}">edit_square</a>`:""}
      </div>
    </article>`})});
