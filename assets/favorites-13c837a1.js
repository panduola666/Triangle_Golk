import{a as t,S as c}from"./main-4c0e2c7d.js";import{C as i}from"./course-4f13abac.js";const{VITE_BASEURL:a}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},d={async add(e){try{const s={userId:Number(localStorage.getItem("userId")),courseId:Number(e)},o=await t.post(`${a}/favorites`,s);c.fire({scrollbarPadding:!1,icon:"success",title:"已加入關注清單",showConfirmButton:!1,timer:1500,allowOutsideClick:!1})}catch(s){console.log(s)}},async remove(e){try{const s=await t.delete(`${a}/favorites/${e}`);c.fire({scrollbarPadding:!1,icon:"success",title:"已移出關注清單",showConfirmButton:!1,timer:1500,allowOutsideClick:!1})}catch(s){console.log(s)}},async getUserFavorites(){try{const e=await i.getAllCourses();return(await t.get(`${a}/favorites?_expand=course&userId=${localStorage.getItem("userId")}`)).data.map(o=>{const r=e.find(l=>l.id===o.courseId);if(r)return{...o,avgScore:r.avgScore,totalComment:r.comments.length}}).filter(o=>o)}catch(e){console.log(e)}}};export{d as F};
