import{a as j,S as q,U as de}from"./footer-593f08a3.js";import"./apply_course-860e5b7b.js";import{e as ue,c as pe,g as _,S as me}from"./swiper-core-d55539fa.js";import{C as M}from"./comment-5b611eab.js";import{C as te}from"./course-45aa811e.js";const{VITE_BASEURL:fe}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},ge={async addPasses(a){try{const e=await j.post(`${fe}/passes`,a);return q.fire({icon:"success",title:"通過測試",showConfirmButton:!1,timer:2e3}),e.data}catch(e){console.log(e)}}},{VITE_BASEURL:Y}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},R={async add(a){try{const e={userId:Number(localStorage.getItem("userId")),courseId:Number(a)},n=await j.post(`${Y}/favorites`,e);q.fire({icon:"success",title:"已加入關注清單",showConfirmButton:!1,timer:1500,allowOutsideClick:!1})}catch(e){console.log(e)}},async remove(a){try{const e=await j.delete(`${Y}/favorites/${a}`);q.fire({icon:"success",title:"已移出關注清單",showConfirmButton:!1,timer:1500,allowOutsideClick:!1})}catch(e){console.log(e)}}};function ve(a,e,n,l){return a.params.createElements&&Object.keys(l).forEach(t=>{if(!n[t]&&n.auto===!0){let r=ue(a.el,`.${l[t]}`)[0];r||(r=pe("div",l[t]),r.className=l[t],a.el.append(r)),n[t]=r,e[t]=r}}),n}function ye(a){let{swiper:e,extendParams:n,on:l,emit:t}=a;n({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null};const r=s=>(Array.isArray(s)?s:[s]).filter(i=>!!i);function m(s){let i;return s&&typeof s=="string"&&e.isElement&&(i=e.el.querySelector(s),i)?i:(s&&(typeof s=="string"&&(i=[...document.querySelectorAll(s)]),e.params.uniqueNavElements&&typeof s=="string"&&i.length>1&&e.el.querySelectorAll(s).length===1&&(i=e.el.querySelector(s))),s&&!i?s:i)}function v(s,i){const o=e.params.navigation;s=r(s),s.forEach(d=>{d&&(d.classList[i?"add":"remove"](...o.disabledClass.split(" ")),d.tagName==="BUTTON"&&(d.disabled=i),e.params.watchOverflow&&e.enabled&&d.classList[e.isLocked?"add":"remove"](o.lockClass))})}function L(){const{nextEl:s,prevEl:i}=e.navigation;if(e.params.loop){v(i,!1),v(s,!1);return}v(i,e.isBeginning&&!e.params.rewind),v(s,e.isEnd&&!e.params.rewind)}function T(s){s.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),t("navigationPrev"))}function f(s){s.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),t("navigationNext"))}function E(){const s=e.params.navigation;if(e.params.navigation=ve(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(s.nextEl||s.prevEl))return;let i=m(s.nextEl),o=m(s.prevEl);Object.assign(e.navigation,{nextEl:i,prevEl:o}),i=r(i),o=r(o);const d=(u,$)=>{u&&u.addEventListener("click",$==="next"?f:T),!e.enabled&&u&&u.classList.add(...s.lockClass.split(" "))};i.forEach(u=>d(u,"next")),o.forEach(u=>d(u,"prev"))}function x(){let{nextEl:s,prevEl:i}=e.navigation;s=r(s),i=r(i);const o=(d,u)=>{d.removeEventListener("click",u==="next"?f:T),d.classList.remove(...e.params.navigation.disabledClass.split(" "))};s.forEach(d=>o(d,"next")),i.forEach(d=>o(d,"prev"))}l("init",()=>{e.params.navigation.enabled===!1?S():(E(),L())}),l("toEdge fromEdge lock unlock",()=>{L()}),l("destroy",()=>{x()}),l("enable disable",()=>{let{nextEl:s,prevEl:i}=e.navigation;s=r(s),i=r(i),[...s,...i].filter(o=>!!o).forEach(o=>o.classList[e.enabled?"remove":"add"](e.params.navigation.lockClass))}),l("click",(s,i)=>{let{nextEl:o,prevEl:d}=e.navigation;o=r(o),d=r(d);const u=i.target;if(e.params.navigation.hideOnClick&&!d.includes(u)&&!o.includes(u)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===u||e.pagination.el.contains(u)))return;let $;o.length?$=o[0].classList.contains(e.params.navigation.hiddenClass):d.length&&($=d[0].classList.contains(e.params.navigation.hiddenClass)),t($===!0?"navigationShow":"navigationHide"),[...o,...d].filter(k=>!!k).forEach(k=>k.classList.toggle(e.params.navigation.hiddenClass))}});const C=()=>{e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),E(),L()},S=()=>{e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),x()};Object.assign(e.navigation,{enable:C,disable:S,update:L,init:E,destroy:x})}function be(a){let{swiper:e,extendParams:n,on:l,emit:t,params:r}=a;e.autoplay={running:!1,paused:!1,timeLeft:0},n({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let m,v,L=r&&r.autoplay?r.autoplay.delay:3e3,T=r&&r.autoplay?r.autoplay.delay:3e3,f,E=new Date().getTime,x,C,S,s,i,o;function d(c){!e||e.destroyed||!e.wrapperEl||c.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",d),I())}const u=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?x=!0:x&&(T=f,x=!1);const c=e.autoplay.paused?f:E+T-new Date().getTime();e.autoplay.timeLeft=c,t("autoplayTimeLeft",c,c/L),v=requestAnimationFrame(()=>{u()})},$=()=>{let c;return e.virtual&&e.params.virtual.enabled?c=e.slides.filter(y=>y.classList.contains("swiper-slide-active"))[0]:c=e.slides[e.activeIndex],c?parseInt(c.getAttribute("data-swiper-autoplay"),10):void 0},k=c=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(v),u();let w=typeof c>"u"?e.params.autoplay.delay:c;L=e.params.autoplay.delay,T=e.params.autoplay.delay;const y=$();!Number.isNaN(y)&&y>0&&typeof c>"u"&&(w=y,L=y,T=y),f=w;const D=e.params.speed,X=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(D,!0,!0),t("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,D,!0,!0),t("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(D,!0,!0),t("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,D,!0,!0),t("autoplay")),e.params.cssMode&&(E=new Date().getTime(),requestAnimationFrame(()=>{k()})))};return w>0?(clearTimeout(m),m=setTimeout(()=>{X()},w)):requestAnimationFrame(()=>{X()}),w},J=()=>{e.autoplay.running=!0,k(),t("autoplayStart")},B=()=>{e.autoplay.running=!1,clearTimeout(m),cancelAnimationFrame(v),t("autoplayStop")},N=(c,w)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(m),c||(o=!0);const y=()=>{t("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",d):I()};if(e.autoplay.paused=!0,w){i&&(f=e.params.autoplay.delay),i=!1,y();return}f=(f||e.params.autoplay.delay)-(new Date().getTime()-E),!(e.isEnd&&f<0&&!e.params.loop)&&(f<0&&(f=0),y())},I=()=>{e.isEnd&&f<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(E=new Date().getTime(),o?(o=!1,k(f)):k(),e.autoplay.paused=!1,t("autoplayResume"))},K=()=>{if(e.destroyed||!e.autoplay.running)return;const c=_();c.visibilityState==="hidden"&&(o=!0,N(!0)),c.visibilityState==="visible"&&I()},Q=c=>{c.pointerType==="mouse"&&(o=!0,!(e.animating||e.autoplay.paused)&&N(!0))},W=c=>{c.pointerType==="mouse"&&e.autoplay.paused&&I()},re=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",Q),e.el.addEventListener("pointerleave",W))},oe=()=>{e.el.removeEventListener("pointerenter",Q),e.el.removeEventListener("pointerleave",W)},le=()=>{_().addEventListener("visibilitychange",K)},ce=()=>{_().removeEventListener("visibilitychange",K)};l("init",()=>{e.params.autoplay.enabled&&(re(),le(),E=new Date().getTime(),J())}),l("destroy",()=>{oe(),ce(),e.autoplay.running&&B()}),l("beforeTransitionStart",(c,w,y)=>{e.destroyed||!e.autoplay.running||(y||!e.params.autoplay.disableOnInteraction?N(!0,!0):B())}),l("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){B();return}C=!0,S=!1,o=!1,s=setTimeout(()=>{o=!0,S=!0,N(!0)},200)}}),l("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!C)){if(clearTimeout(s),clearTimeout(m),e.params.autoplay.disableOnInteraction){S=!1,C=!1;return}S&&e.params.cssMode&&I(),S=!1,C=!1}}),l("slideChange",()=>{e.destroyed||!e.autoplay.running||(i=!0)}),Object.assign(e.autoplay,{start:J,stop:B,pause:N,resume:I})}new me(".other-courses",{slidesPerView:1,spaceBetween:30,centeredSlides:!1,loop:!0,breakpoints:{992:{slidesPerView:3}},modules:[ye,be],autoplay:{delay:3e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"}});const he=document.querySelector(".course-title section"),U=document.querySelector(".favorite-btn"),Z=U.querySelector(".course-favorite-icon"),Ee=document.querySelector(".blackboard-mark"),we=document.querySelector(".course-cover"),Le=document.querySelector(".course-scores"),Se=document.querySelector(".course-tags"),b=document.querySelector(".course-test"),ae=document.querySelector(".classroom-btn"),se=document.querySelector(".test-passed"),ke=document.querySelector(".course-page-nav"),V=ke.querySelectorAll("[data-key]"),F=document.querySelector(".comment-list"),O=document.querySelector(".pagination"),ee=document.querySelector(".other-courses > ul"),H=new URLSearchParams(window.location.search),h=H.has("id")&&H.get("id"),P=H.has("sort")&&H.get("sort");let A,g,p;async function G(){if(!localStorage.getItem("token")){U.classList.add("d-none"),ae.classList.add("d-none");return}p=await de.getUserInfo(),console.log(p),p&&(U.classList.remove("d-none"),p.favorites.find(a=>Number(a.courseId)===Number(h))?Z.classList.remove("outline-icon"):Z.classList.add("outline-icon"),p.passes.some(a=>Number(a.courseId)===Number(h))&&ne())}async function Te(){try{await G(),A=await te.getCourse(h),g=await M.getComments(1,6,P,"desc",h),xe(A),P==="timer"&&V[0].classList.add("active"),P==="likesNum"&&V[1].classList.add("active"),z(g),ie(),$e()}catch(a){console.log(a)}}function ne(){b.classList.add("d-none"),se.classList.remove("d-none"),ae.classList.remove("d-none")}function xe(a){he.innerHTML=`
  <span class="bg-secondary text-white py-2 px-4 rounded-1 me-lg-3 me-2 mb-1 mb-lg-0">${a.platform}</span>
  <h1 class="page-title fs-lg-2 fs-4 fw-bold text-nowrap">
    ${a.title}
  </h1>
              `,Ee.setAttribute("href",a.url),we.setAttribute("src",a.cover);let e="";for(let n=1;n<=5;n++)e+=`<span class="fs-2 material-symbols-outlined ${n<=a.avgScore?"":"outline-icon"}">star</span>`;Le.innerHTML=e,Se.innerHTML=a.tags.map(n=>`<li class="border border-secondary p-1 px-3 rounded-5 small">${n}</li>`).join(""),se.innerHTML=`已經有 ${a.passes.length} 人通過測驗，趕快來進來交流吧！`}function z(a){if(!a.data.length){F.innerHTML='<p class="text-center fs-3 py-4">當前課程尚未評論</p>';return}F.innerHTML=a.data.map((e,n)=>{const l=e.user.email.split("@")[0],t=`${l[0]}***${l[l.length-1]}`;return`<li class="col-lg-4">
    <article
      class="fw-bold ${e.theme?"course-page-comment":"comment-style0"} bg-${(n+1)%3===0?"blue":(n+1)%3===1?"primary":"orange"} px-3 pb-3 d-flex flex-column h-100"
    >
    <div class="flex-grow-1">
        <div class="stars-icon d-flex float-end">
          <span class="material-symbols-outlined ${e.score>=1?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${e.score>=2?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${e.score>=3?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${e.score>=4?"":"outline-icon"}">star</span>
          <span class="material-symbols-outlined ${e.score>=5?"":"outline-icon"}">star</span>
        </div>
        <p class="fs-5 mb-2">${Number(e.showName)?e.user.nickName:t}：</p>
        <div class="fs-6">
          ${e.content}
        </div>
    </div>
      <div class="${localStorage.getItem("token")?"d-flex":"d-none"} align-items-center gap-2">
          <!-- 用 .active 控制是否點擊 -->
        <span class="thumb-up ${p&&e.likes.includes(p.id)?"active":""} material-symbols-outlined cur-point" data-comment="${e.id}">
          thumb_up
          </span>
        <p class="mb-0">${e.likesNum}</p>
      </div>
    </article>
  </li>`}).join("")}function ie(){if(!g.totalPages){O.innerHTML="";return}let a="";for(let n=1;n<=g.totalPages;n++)a+=`<li class="page-item p-hover ${g.currentPage===n?"active":""}"><a class="page-link" href="#" data-link="${n}">${n}</a></li>`;O.innerHTML=`
  <li class="page-item p-hover">
      <a class="page-link ${g.currentPage===1?"d-none":""}" href="#" aria-label="Previous" data-link="${g.currentPage-1}">
          <span aria-hidden="true">&laquo;</span>
      </a>
  </li>
  ${a}
  <li class="page-item p-hover">
      <a class="page-link ${g.currentPage===g.totalPages?"d-none":""}" href="#" aria-label="Next" data-link="${g.currentPage+1}">
          <span aria-hidden="true">&raquo;</span>
      </a>
  </li>`,O.addEventListener("click",e);async function e(n){n.preventDefault(),n.stopPropagation(),n.target.dataset.link&&(O.removeEventListener("click",e),n.target.dataset.link&&(g=await M.getComments(Number(n.target.dataset.link),6,P,"desc",h)),z(g),ie())}}async function $e(){const a=await te.getAllCourses(),e=[];a.forEach(t=>{t.tags.some(m=>A.tags.includes(m))&&e.push(t)});const n=e.filter(t=>t.avgScore>=0);if(!n.length){ee.innerHTML=`
    <li class="flex-grow-1 text-center">
      <p class="fs-4">沒有相似課程</p>
      <a href="./course.html" class="btn btn-primary">來去逛逛</a>
    </li>
    `;return}ee.innerHTML=n.map(t=>`
    <div class="swiper-slide">
      <li class="d-flex flex-column">
        <a class="card card-hover h-100 rounded-4 position-relative" href="./coursepages.html?id=${t.id}&sort=timer">
          <div class="pic">
            <img
              src="${t.cover}"
              alt="${t.title}"
              class="card-pic"
            />
          </div>
          <div
            class="badge d-flex justify-content-between align-items-center position-absolute"
          >
            <span
              class="brand bg-secondary small text-white rounded-1 py-1 px-3"
              >${t.platform}</span
            >
            
            <span
            class="${localStorage.getItem("token")?"":"d-none"} favorite others-favorite-btn material-symbols-outlined position-absolute ${localStorage.getItem("token")&&t.favorites.some(r=>r.userId===p.id)?"":"outline-icon"}"
            data-id="${t.id}"
            >favorite</span
          >
          </div>
          <div class="card-body">
            <h3 class="title text-secondary fs-6 fw-bold text-truncate">${t.title}</h3>
          </div>
          <div class="card-footer">
            <div class="tags mb-2 mt-auto">
            ${t.tags.map(r=>`<span class="fs-8 me-2">#${r}</span>`).join("")}
            </div>
            <div class="stars d-flex">
              <div class="stars-icon text-primary me-2">
                <span class="material-symbols-outlined ${t.avgScore>=1?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${t.avgScore>=2?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${t.avgScore>=3?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${t.avgScore>=4?"":"outline-icon"}">star</span>
                <span class="material-symbols-outlined ${t.avgScore>=5?"":"outline-icon"}"
                  >star</span
                >
              </div>
              <span class="fs-8 text-gray-400">(${t.comments.length})</span>
            </div>
          </div>
        </a>
      </li>
    </div>
    `).join(""),document.querySelectorAll(".others-favorite-btn").forEach(t=>{t.addEventListener("click",async r=>{r.preventDefault(),console.log(t);const m=p.favorites.findIndex(v=>Number(v.courseId)===Number(r.target.dataset.id));if(m===-1)await R.add(h),t.classList.remove("outline-icon");else{const v=p.favorites[m].id;await R.remove(v),t.classList.add("outline-icon")}await G()})})}Te();U.addEventListener("click",async a=>{a.stopPropagation();const e=p.favorites.findIndex(n=>Number(n.courseId)===Number(h));if(e===-1)await R.add(h);else{const n=p.favorites[e].id;await R.remove(n)}await G(),console.log(p)});F.addEventListener("click",async a=>{if(!a.target.dataset.comment)return;const e=g.data.find(m=>m.id===Number(a.target.dataset.comment)),{id:n,likes:l,likesNum:t}=e;if(l.includes(p.id))return;l.push(p.id);const r={likes:l,likesNum:l.length};M.likeComment(n,r),z(await M.getComments(Number(a.target.dataset.link),6,P,"desc",n))});b.addEventListener("submit",a=>{if(a.preventDefault(),b["test-name"].classList.remove("is-invalid"),b["test-brand"].classList.remove("is-invalid"),b["test-name"].value.trim()||b["test-name"].classList.add("is-invalid"),b["test-brand"].value.trim()||b["test-brand"].classList.add("is-invalid"),![...b.querySelectorAll(".is-invalid")].length){if(b["test-name"].value.trim()!==A.title||b["test-brand"].value.trim()!==A.platform){b.reset(),q.fire({icon:"error",title:"回答錯誤,再找找答案吧"});return}if(!localStorage.getItem("token")){q.fire({icon:"error",title:"請加入會員",showConfirmButton:!1,timer:1500});return}ge.addPasses({userId:p.id,courseId:Number(h),isFinish:!1}),ne()}});V.forEach(a=>{a.addEventListener("click",e=>{location.search=`?id=${h}&sort=${e.target.dataset.key}`})});
