import{a as n,S as d}from"./main-20e5e0cf.js";const{VITE_BASEURL:l}={VITE_BASEURL:"https://triangle-golk-json-server.onrender.com",BASE_URL:"/Triangle_Golk/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},u={async getCourse(o){try{const t=await n.get(`${l}/courses/${o}?_embed=comments&_embed=passes`),{comments:e=[]}=t.data,r=e.reduce((i,s)=>i+=Number(s.score),0)/(e.length||1);return{...t.data,avgScore:Math.floor(r)}}catch(t){if(console.log(t),t.response.status===404){const e=await d.fire({scrollbarPadding:!1,icon:"error",text:"查無此課程"});(e.isConfirmed||e.isDismissed)&&window.history.go(-1)}}},async getAllCourses(){try{let o;const t=new URLSearchParams(window.location.search),e=t.has("platform")?t.getAll("platform"):[],r=t.has("q")?t.get("q"):"";if(window.location.search&&!e.includes("其他平台"))o=await n.get(`${l}/courses${window.location.search}&_embed=comments&_embed=favorites`);else if(window.location.search){e.splice(e.indexOf("其他平台"),1);const c=["六角學院","Udemy","Hahow","Coursera"].filter(a=>!e.includes(a)),m=await n.get(`${l}/courses?_embed=comments&_embed=favorites${r?`&q=${r}`:""}`);o={...m,data:m.data.filter(a=>!c.includes(a.platform))}}else o=await n.get(`${l}/courses?_embed=comments&_embed=favorites`);return o.data.map(s=>{const{comments:c=[]}=s,m=c.reduce((a,f)=>a+=Number(f.score),0)/(c.length||1);return{...s,comments:s.comments.filter(a=>a.isPassed===1),avgScore:Math.floor(m)}})}catch(o){console.log(o),await d.fire({scrollbarPadding:!1,icon:"error",text:"取得課程失敗"})}},async getNewThree(){try{return(await n.get(`${l}/courses?_sort=id&_order=desc&_limit=3&_embed=comments`)).data.map(e=>{const{comments:r=[]}=e,i=r.reduce((s,c)=>s+=Number(c.score),0)/(r.length||1);return{...e,avgScore:Math.floor(i)}})}catch(o){console.log(o)}}};export{u as C};