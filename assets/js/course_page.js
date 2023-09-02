import Swiper from 'swiper';
import 'swiper/css';
import Swal from 'sweetalert2';
import { Navigation, Autoplay } from 'swiper/modules';
import { Course, Comment, Passes } from '../api';

// swiper 配置
const swiper = new Swiper('.other-courses', {
  // 配置你使用的 swiper class 名稱
  slidesPerView: 1, // 一頁幾張
  spaceBetween: 30, // 每一頁的間距
  centeredSlides: false,
  loop: true, // 循環播放
  breakpoints: {
    992: {
      slidesPerView: 3,
    },
  },
  modules: [Navigation, Autoplay],
  autoplay: {
    // 自動撥放配置
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-next', // 控制上一頁箭頭用哪個 class
    prevEl: '.swiper-prev',
  },
});

const blackboardLink = document.querySelector('.blackboard-mark'); // 課程前往的鏈接
const blackboardCover = document.querySelector('.course-cover'); // 課程封面
const courseScores = document.querySelector('.course-scores');
const courseTags = document.querySelector('.course-tags');
const testForm = document.querySelector('.course-test');
const testPassed = document.querySelector('.test-passed')

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.has('id') && urlParams.get('id');

let course;
async function init() {
  try {
    course = await Course.getCourse(id);
    const comments = await Comment.getComments();

    // 課程資料初始化
    blackboardLink.setAttribute('href', course.url);
    blackboardCover.setAttribute('src', course.cover);
    let scoresStr = '';
    for (let i = 1; i <= 5; i++) {
      scoresStr += `<span class="fs-2 material-symbols-outlined ${
        i <= course.avgScore ? '' : 'outline-icon'
      }">star</span>`;
    }
    courseScores.innerHTML = scoresStr;
    courseTags.innerHTML = course.tags
      .map(
        (tag) =>
          `<li class="border border-secondary p-1 px-3 rounded-5 small">${tag}</li>`
      )
      .join('');

      testPassed.innerHTML = `已經有 ${course.passes.length} 人通過測驗，趕快來進來交流吧！`

      // 下方評論初始化
    console.log('comments', comments);
  } catch (err) {
    console.log(err);
  }
}
function hasTestPassed() {
  testForm.classList.add('d-none')
  testPassed.classList.remove('d-none')
}
init();

// 課堂小測
testForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // 驗證
  testForm['test-name'].classList.remove('is-invalid');
  testForm['test-brand'].classList.remove('is-invalid');
  if (!testForm['test-name'].value.trim()) {
    testForm['test-name'].classList.add('is-invalid');
  }
  if (!testForm['test-brand'].value.trim()) {
    testForm['test-brand'].classList.add('is-invalid');
  }
  if ([...testForm.querySelectorAll('.is-invalid')].length) return;
  if (
    testForm['test-name'].value.trim() !== course.title ||
    testForm['test-brand'].value.trim() !== course.platform
  ) {
    testForm.reset();
    Swal.fire({
      icon: 'error',
      title: '回答錯誤,再找找答案吧',
    });
    return;
  }

  // 驗證成功
  Passes.addPasses({
    userId: 1, // 待串接, 先用假資料
    courseId: Number(id),
    isFinish: false
  })
  hasTestPassed()
});
