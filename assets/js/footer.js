
const scrollTop = document.querySelector('.scroll-top')

// 聯繫客服 icon
import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle';

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new Tooltip(tooltipTriggerEl)
})


scrollTop.addEventListener('click', () => {
  let timer;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn(){
      const oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(oTop > 0){
          scrollBy(0,-30); // 控制滾上去的速度
          timer = requestAnimationFrame(fn);
      }else{
          cancelAnimationFrame(timer);
      }    
  });
})