import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';

// swiper 配置
const swiper = new Swiper(".other-courses", { // 配置你使用的 swiper class 名稱
    slidesPerView: 1, // 一頁幾張
    spaceBetween: 30, // 每一頁的間距
    centeredSlides: false,
    loop: true, // 循環播放
    breakpoints: {
        992: {
            slidesPerView: 3
        }
    },
    modules: [Navigation, Autoplay],
    autoplay: { // 自動撥放配置
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-next", // 控制上一頁箭頭用哪個 class
      prevEl: ".swiper-prev",
    },
  });