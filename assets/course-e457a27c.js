import{S as n}from"./main-4c0e2c7d.js";i();function i(){document.querySelectorAll("#fav-btn").forEach(a=>{a.addEventListener("click",t=>{t.preventDefault(),t.target.dataset.href,localStorage.getItem("token")||n.fire({scrollbarPadding:!1,title:"請先登入"}).then(e=>{(e.isConfirmed||e.isDismissed)&&$("#account").modal("show")})})})}
