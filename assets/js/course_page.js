var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, // 一頁幾張
    spaceBetween: 30, // 每一頁的間距
    centeredSlides: false,
    loop: true, // 循環播放
    breakpoints: {
        992: {
            slidesPerView: 3
        }
    },
    autoplay: { // 自動撥放配置
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-next", // 控制上一頁箭頭用哪個 class
      prevEl: ".swiper-prev",
    },
  });