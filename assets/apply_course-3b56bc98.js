import"https://unpkg.com/@wangeditor/editor@latest/dist/index.js";import{a as s,S as n,M as p}from"./main-20e5e0cf.js";const{VITE_BASEURL:l}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},f={async post(o){try{const t={...o,userId:Number(localStorage.getItem("userId")),timer:new Date().getTime(),isPassed:-1},u=await s.post(`${l}/coursesApplies`,t);n.fire({scrollbarPadding:!1,title:"已送出",icon:"success",text:"感謝您的推薦，我們將於 7-14 天內給予您答覆！",showConfirmButton:!1,timer:1500});const m=await s.get(`${l}/users/${localStorage.getItem("userId")}`),{avatars:r}=m.data;return r.includes(5)||(r.push(5),await s.patch(`${l}/users/${localStorage.getItem("userId")}`,{avatars:r}),n.fire({scrollbarPadding:!1,title:"恭喜您獲得新徽章",showConfirmButton:!1,timer:2500,allowOutsideClick:!1})),u.data}catch(t){console.log(t)}}},e=document.querySelector(".apply-form"),g=document.querySelector(".apply-btn"),i=document.querySelector("#apply-modal"),c=new p(i);let a;g.addEventListener("click",()=>c.show());e.addEventListener("submit",function(o){if(o.preventDefault(),!e["course-name"].value||!e["brand-name"].value||!e["course-link"].value)return;if(!a||a==="<p><br></p>"){n.fire({scrollbarPadding:!1,icon:"error",title:"請輸入理由"});return}const t={title:e["course-name"].value,platform:e["brand-name"].value,reason:e["course-link"].value,url:a};f.post(t),c.hide()});i.addEventListener("hidden.bs.modal",()=>{e.classList.remove("was-validated"),d.setHtml(""),e.reset()});const{createEditor:b,createToolbar:h}=window.wangEditor,v={placeholder:"最多不超過 400 字",maxLength:400,onChange(o){a=o.getHtml()}},d=b({selector:"#editor-container",html:"<p><br></p>",config:v,mode:"simple"}),w={toolbarKeys:["bold","underline","italic","|","undo","redo"]};h({editor:d,selector:"#toolbar-container",config:w,mode:"default"});