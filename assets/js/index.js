import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Course, Comment } from '../api/index'

// TODO
// 1. 點擊關鍵字跳轉搜尋
// 2. 學員推課獲取評論
// 3. 最新課程
// 4. 申請新課
// console.log(await Comment.getBest()); => 獲取評分高於4的評論
// console.log(await Course.getNewThree()); => 獲取最新的三個課程

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
  