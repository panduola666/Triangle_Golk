import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';



// swiper 配置
const swiper = new Swiper('.other-courses', {
  // 配置你使用的 swiper class 名稱
  slidesPerView: 'auto', // 一頁幾張
  spaceBetween: 16, // 每一頁的間距
  centeredSlides: false,
  loop: true, // 循環播放
  modules: [Navigation, Autoplay, Pagination],
  autoplay: {
    // 自動撥放配置
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-next', // 控制上一頁箭頭用哪個 class
    prevEl: '.swiper-pre',
  },
  pagination: {
    el: ".swiper-pagination",
    clickable :true,
  },
  });
  