import{a as r,S as s}from"./main-b28f6a90.js";const{VITE_BASEURL:e}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},c={async getTotal(){try{return(await r.get(`${e}/avatars`)).data}catch(a){console.log(a)}},async setAvatar(a){try{const t=await r.patch(`${e}/users/${localStorage.getItem("userId")}`,{avatarId:Number(a)});return s.fire({scrollbarPadding:!1,icon:"success",title:"頭像變更成功",showConfirmButton:!1,timer:1500}),t.data}catch(t){console.log(t)}}};export{c as A};
