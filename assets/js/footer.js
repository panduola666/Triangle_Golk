
const scrollTop = document.querySelector('.scroll-top')




scrollTop.addEventListener('click', () => {
  let timer;
  cancelAnimationFrame(timer);
  timer = requestAnimationFrame(function fn(){
      const oTop = document.body.scrollTop || document.documentElement.scrollTop;
      if(oTop > 0){
          scrollBy(0,-35); // 控制滾上去的速度
          timer = requestAnimationFrame(fn);
      }else{
          cancelAnimationFrame(timer);
      }    
  });
})