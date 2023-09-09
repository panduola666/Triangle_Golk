import{S as W,U as ce}from"./footer-b5e551b8.js";import"./apply_course-a6ef7b6a.js";import{e as de,c as ue,g as j,S as pe}from"./swiper-core-d55539fa.js";import{l as X}from"./index-ea213776.js";import{F as M}from"./favorites-e1a28145.js";import{C as B}from"./comment-ec1c430b.js";import{P as me}from"./passes-09adcf24.js";import{C as ee}from"./course-944b0619.js";function fe(s,e,n,l){return s.params.createElements&&Object.keys(l).forEach(t=>{if(!n[t]&&n.auto===!0){let r=de(s.el,`.${l[t]}`)[0];r||(r=ue("div",l[t]),r.className=l[t],s.el.append(r)),n[t]=r,e[t]=r}}),n}function ge(s){let{swiper:e,extendParams:n,on:l,emit:t}=s;n({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,prevEl:null};const r=a=>(Array.isArray(a)?a:[a]).filter(i=>!!i);function p(a){let i;return a&&typeof a=="string"&&e.isElement&&(i=e.el.querySelector(a),i)?i:(a&&(typeof a=="string"&&(i=[...document.querySelectorAll(a)]),e.params.uniqueNavElements&&typeof a=="string"&&i.length>1&&e.el.querySelectorAll(a).length===1&&(i=e.el.querySelector(a))),a&&!i?a:i)}function v(a,i){const o=e.params.navigation;a=r(a),a.forEach(d=>{d&&(d.classList[i?"add":"remove"](...o.disabledClass.split(" ")),d.tagName==="BUTTON"&&(d.disabled=i),e.params.watchOverflow&&e.enabled&&d.classList[e.isLocked?"add":"remove"](o.lockClass))})}function w(){const{nextEl:a,prevEl:i}=e.navigation;if(e.params.loop){v(i,!1),v(a,!1);return}v(i,e.isBeginning&&!e.params.rewind),v(a,e.isEnd&&!e.params.rewind)}function k(a){a.preventDefault(),!(e.isBeginning&&!e.params.loop&&!e.params.rewind)&&(e.slidePrev(),t("navigationPrev"))}function f(a){a.preventDefault(),!(e.isEnd&&!e.params.loop&&!e.params.rewind)&&(e.slideNext(),t("navigationNext"))}function E(){const a=e.params.navigation;if(e.params.navigation=fe(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!(a.nextEl||a.prevEl))return;let i=p(a.nextEl),o=p(a.prevEl);Object.assign(e.navigation,{nextEl:i,prevEl:o}),i=r(i),o=r(o);const d=(u,T)=>{u&&u.addEventListener("click",T==="next"?f:k),!e.enabled&&u&&u.classList.add(...a.lockClass.split(" "))};i.forEach(u=>d(u,"next")),o.forEach(u=>d(u,"prev"))}function $(){let{nextEl:a,prevEl:i}=e.navigation;a=r(a),i=r(i);const o=(d,u)=>{d.removeEventListener("click",u==="next"?f:k),d.classList.remove(...e.params.navigation.disabledClass.split(" "))};a.forEach(d=>o(d,"next")),i.forEach(d=>o(d,"prev"))}l("init",()=>{e.params.navigation.enabled===!1?S():(E(),w())}),l("toEdge fromEdge lock unlock",()=>{w()}),l("destroy",()=>{$()}),l("enable disable",()=>{let{nextEl:a,prevEl:i}=e.navigation;a=r(a),i=r(i),[...a,...i].filter(o=>!!o).forEach(o=>o.classList[e.enabled?"remove":"add"](e.params.navigation.lockClass))}),l("click",(a,i)=>{let{nextEl:o,prevEl:d}=e.navigation;o=r(o),d=r(d);const u=i.target;if(e.params.navigation.hideOnClick&&!d.includes(u)&&!o.includes(u)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===u||e.pagination.el.contains(u)))return;let T;o.length?T=o[0].classList.contains(e.params.navigation.hiddenClass):d.length&&(T=d[0].classList.contains(e.params.navigation.hiddenClass)),t(T===!0?"navigationShow":"navigationHide"),[...o,...d].filter(x=>!!x).forEach(x=>x.classList.toggle(e.params.navigation.hiddenClass))}});const C=()=>{e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),E(),w()},S=()=>{e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),$()};Object.assign(e.navigation,{enable:C,disable:S,update:w,init:E,destroy:$})}function ve(s){let{swiper:e,extendParams:n,on:l,emit:t,params:r}=s;e.autoplay={running:!1,paused:!1,timeLeft:0},n({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let p,v,w=r&&r.autoplay?r.autoplay.delay:3e3,k=r&&r.autoplay?r.autoplay.delay:3e3,f,E=new Date().getTime,$,C,S,a,i,o;function d(c){!e||e.destroyed||!e.wrapperEl||c.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",d),N())}const u=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?$=!0:$&&(k=f,$=!1);const c=e.autoplay.paused?f:E+k-new Date().getTime();e.autoplay.timeLeft=c,t("autoplayTimeLeft",c,c/w),v=requestAnimationFrame(()=>{u()})},T=()=>{let c;return e.virtual&&e.params.virtual.enabled?c=e.slides.filter(y=>y.classList.contains("swiper-slide-active"))[0]:c=e.slides[e.activeIndex],c?parseInt(c.getAttribute("data-swiper-autoplay"),10):void 0},x=c=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(v),u();let L=typeof c>"u"?e.params.autoplay.delay:c;w=e.params.autoplay.delay,k=e.params.autoplay.delay;const y=T();!Number.isNaN(y)&&y>0&&typeof c>"u"&&(L=y,w=y,k=y),f=L;const q=e.params.speed,Q=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(q,!0,!0),t("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,q,!0,!0),t("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(q,!0,!0),t("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,q,!0,!0),t("autoplay")),e.params.cssMode&&(E=new Date().getTime(),requestAnimationFrame(()=>{x()})))};return L>0?(clearTimeout(p),p=setTimeout(()=>{Q()},L)):requestAnimationFrame(()=>{Q()}),L},z=()=>{e.autoplay.running=!0,x(),t("autoplayStart")},O=()=>{e.autoplay.running=!1,clearTimeout(p),cancelAnimationFrame(v),t("autoplayStop")},I=(c,L)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(p),c||(o=!0);const y=()=>{t("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",d):N()};if(e.autoplay.paused=!0,L){i&&(f=e.params.autoplay.delay),i=!1,y();return}f=(f||e.params.autoplay.delay)-(new Date().getTime()-E),!(e.isEnd&&f<0&&!e.params.loop)&&(f<0&&(f=0),y())},N=()=>{e.isEnd&&f<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(E=new Date().getTime(),o?(o=!1,x(f)):x(),e.autoplay.paused=!1,t("autoplayResume"))},G=()=>{if(e.destroyed||!e.autoplay.running)return;const c=j();c.visibilityState==="hidden"&&(o=!0,I(!0)),c.visibilityState==="visible"&&N()},J=c=>{c.pointerType==="mouse"&&(o=!0,!(e.animating||e.autoplay.paused)&&I(!0))},K=c=>{c.pointerType==="mouse"&&e.autoplay.paused&&N()},ie=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",J),e.el.addEventListener("pointerleave",K))},re=()=>{e.el.removeEventListener("pointerenter",J),e.el.removeEventListener("pointerleave",K)},oe=()=>{j().addEventListener("visibilitychange",G)},le=()=>{j().removeEventListener("visibilitychange",G)};l("init",()=>{e.params.autoplay.enabled&&(ie(),oe(),E=new Date().getTime(),z())}),l("destroy",()=>{re(),le(),e.autoplay.running&&O()}),l("beforeTransitionStart",(c,L,y)=>{e.destroyed||!e.autoplay.running||(y||!e.params.autoplay.disableOnInteraction?I(!0,!0):O())}),l("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){O();return}C=!0,S=!1,o=!1,a=setTimeout(()=>{o=!0,S=!0,I(!0)},200)}}),l("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!C)){if(clearTimeout(a),clearTimeout(p),e.params.autoplay.disableOnInteraction){S=!1,C=!1;return}S&&e.params.cssMode&&N(),S=!1,C=!1}}),l("slideChange",()=>{e.destroyed||!e.autoplay.running||(i=!0)}),Object.assign(e.autoplay,{start:z,stop:O,pause:I,resume:N})}const ye=document.querySelector(".course-title section"),H=document.querySelector(".favorite-btn"),Y=H.querySelector(".course-favorite-icon"),be=document.querySelector(".blackboard-mark"),he=document.querySelector(".course-cover"),Ee=document.querySelector(".course-scores"),Le=document.querySelector(".course-tags"),b=document.querySelector(".course-test"),te=document.querySelector(".classroom-btn"),ae=document.querySelector(".test-passed"),we=document.querySelector(".course-page-nav"),U=we.querySelectorAll("[data-key]"),V=document.querySelector(".comment-list"),A=document.querySelector(".pagination"),Z=document.querySelector(".other-courses > ul"),F=new URLSearchParams(window.location.search),h=F.has("id")&&F.get("id"),D=F.has("sort")&&F.get("sort");let P,g,m;async function _(){if(!localStorage.getItem("token")){H.classList.add("d-none"),te.classList.add("d-none");return}m=await ce.getUserInfo(),m&&(H.classList.remove("d-none"),m.favorites.find(s=>Number(s.courseId)===Number(h))?Y.classList.remove("outline-icon"):Y.classList.add("outline-icon"),m.passes.some(s=>Number(s.courseId)===Number(h))&&se())}async function Se(){try{X(),await _(),P=await ee.getCourse(h),g=await B.getComments(1,6,D,"desc",h),X(P),xe(P),D==="timer"&&U[0].classList.add("active"),D==="likesNum"&&U[1].classList.add("active"),R(g),ne(),ke()}catch(s){console.log(s)}}function se(){b.classList.add("d-none"),ae.classList.remove("d-none"),te.classList.remove("d-none")}function xe(s){ye.innerHTML=`
  <span class="bg-secondary text-white py-2 px-4 rounded-1 me-lg-3 me-2 mb-1 mb-lg-0">${s.platform}</span>
  <h1 class="page-title fs-lg-2 fs-4 fw-bold text-nowrap">
    ${s.title}
  </h1>
              `,be.setAttribute("href",s.url),he.setAttribute("src",s.cover);let e="";for(let n=1;n<=5;n++)e+=`<span class="fs-2 material-symbols-outlined ${n<=s.avgScore?"":"outline-icon"}">star</span>`;Ee.innerHTML=e,Le.innerHTML=s.tags.map(n=>`<li class="border border-secondary p-1 px-3 rounded-5 small">${n}</li>`).join(""),ae.innerHTML=`已經有 ${s.passes.length} 人通過測驗，趕快來進來交流吧！`}function R(s){if(!s.data.length){V.innerHTML='<p class="text-center fs-3 py-4">當前課程尚未評論</p>';return}V.innerHTML=s.data.map((e,n)=>{const l=e.user.email.split("@")[0],t=`${l[0]}***${l[l.length-1]}`;return`<li class="col-lg-4">
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
        <span class="thumb-up ${m&&e.likes.includes(m.id)?"active":""} material-symbols-outlined cur-point" data-comment="${e.id}">
          thumb_up
          </span>
        <p class="mb-0">${e.likesNum}</p>
      </div>
    </article>
  </li>`}).join("")}function ne(){if(!g.totalPages){A.innerHTML="";return}let s="";for(let n=1;n<=g.totalPages;n++)s+=`<li class="page-item p-hover ${g.currentPage===n?"active":""}"><a class="page-link" href="#" data-link="${n}">${n}</a></li>`;A.innerHTML=`
  <li class="page-item p-hover">
      <a class="page-link ${g.currentPage===1?"d-none":""}" href="#" aria-label="Previous" data-link="${g.currentPage-1}">
          <span aria-hidden="true">&laquo;</span>
      </a>
  </li>
  ${s}
  <li class="page-item p-hover">
      <a class="page-link ${g.currentPage===g.totalPages?"d-none":""}" href="#" aria-label="Next" data-link="${g.currentPage+1}">
          <span aria-hidden="true">&raquo;</span>
      </a>
  </li>`,A.addEventListener("click",e);async function e(n){n.preventDefault(),n.stopPropagation(),n.target.dataset.link&&(A.removeEventListener("click",e),n.target.dataset.link&&(g=await B.getComments(Number(n.target.dataset.link),6,D,"desc",h)),R(g),ne())}}async function ke(){const s=await ee.getAllCourses(),e=[];s.forEach(t=>{t.tags.some(p=>P.tags.includes(p))&&e.push(t)});const n=e.filter(t=>t.avgScore>=0);if(!n.length){Z.innerHTML=`
    <li class="flex-grow-1 text-center">
      <p class="fs-4">沒有相似課程</p>
      <a href="./course.html" class="btn btn-primary">來去逛逛</a>
    </li>
    `;return}Z.innerHTML=n.map(t=>`
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
            class="${localStorage.getItem("token")?"":"d-none"} favorite others-favorite-btn material-symbols-outlined position-absolute ${localStorage.getItem("token")&&t.favorites.some(r=>r.userId===m.id)?"":"outline-icon"}"
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
    `).join(""),new pe(".other-courses",{slidesPerView:1,spaceBetween:30,centeredSlides:!1,loop:!0,breakpoints:{992:{slidesPerView:3}},modules:[ge,ve],autoplay:{delay:3e3,disableOnInteraction:!1},navigation:{nextEl:".swiper-next",prevEl:".swiper-prev"}}),document.querySelectorAll(".others-favorite-btn").forEach(t=>{t.addEventListener("click",async r=>{r.preventDefault(),console.log(t);const p=m.favorites.findIndex(v=>Number(v.courseId)===Number(r.target.dataset.id));if(p===-1)await M.add(h),t.classList.remove("outline-icon");else{const v=m.favorites[p].id;await M.remove(v),t.classList.add("outline-icon")}await _()})})}Se();H.addEventListener("click",async s=>{s.stopPropagation();const e=m.favorites.findIndex(n=>Number(n.courseId)===Number(h));if(e===-1)await M.add(h);else{const n=m.favorites[e].id;await M.remove(n)}await _(),console.log(m)});V.addEventListener("click",async s=>{if(!s.target.dataset.comment)return;const e=g.data.find(p=>p.id===Number(s.target.dataset.comment)),{id:n,likes:l,likesNum:t}=e;if(l.includes(m.id))return;l.push(m.id);const r={likes:l,likesNum:l.length};B.likeComment(n,r),R(await B.getComments(Number(s.target.dataset.link),6,D,"desc",n))});b.addEventListener("submit",s=>{if(s.preventDefault(),b["test-name"].classList.remove("is-invalid"),b["test-brand"].classList.remove("is-invalid"),b["test-name"].value.trim()||b["test-name"].classList.add("is-invalid"),b["test-brand"].value.trim()||b["test-brand"].classList.add("is-invalid"),![...b.querySelectorAll(".is-invalid")].length){if(b["test-name"].value.trim()!==P.title||b["test-brand"].value.trim()!==P.platform){b.reset(),W.fire({scrollbarPadding:!1,icon:"error",title:"回答錯誤,再找找答案吧"});return}if(!localStorage.getItem("token")){W.fire({scrollbarPadding:!1,icon:"error",title:"請加入會員",showConfirmButton:!1,timer:1500});return}me.addPasses({userId:m.id,courseId:Number(h),isFinish:!1}),se()}});U.forEach(s=>{s.addEventListener("click",e=>{location.search=`?id=${h}&sort=${e.target.dataset.key}`})});
