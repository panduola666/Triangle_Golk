const scrollTop = document.querySelector('.scroll-top');

scrollTop.addEventListener('click', () => {
  var height = document.documentElement.scrollTop || document.body.scrollTop;
  var t = setInterval(() => {
    height -= 50;
    if (height > 0) {
      window.scrollTo(0, height);
    } else {
      window.scrollTo(0, 0);
      clearInterval(t);
    }
  }, 10);
});
