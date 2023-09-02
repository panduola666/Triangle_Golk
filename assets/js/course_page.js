import Swiper from 'swiper';
import 'swiper/css';
import Swal from 'sweetalert2';
import { Navigation, Autoplay } from 'swiper/modules';
import { Course, Comment, Passes, User, Favorites } from '../api';

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

const courseTitle = document.querySelector('.course-title section')
const favoriteBtn = document.querySelector('.favorite-btn')
const favoriteIcon = favoriteBtn.querySelector('.course-favorite-icon')
const blackboardLink = document.querySelector('.blackboard-mark'); // 課程前往的鏈接
const blackboardCover = document.querySelector('.course-cover'); // 課程封面
const courseScores = document.querySelector('.course-scores');
const courseTags = document.querySelector('.course-tags');

const testForm = document.querySelector('.course-test');
const classroomBtn = document.querySelector('.classroom-btn')
const testPassed = document.querySelector('.test-passed')
// 獲取最新 跟 最熱評論按鈕
const nav = document.querySelector('.course-page-nav')
const navBtn = nav.querySelectorAll('[data-key]')

const commentList = document.querySelector('.comment-list')
const pagination = document.querySelector('.pagination')

// 其他人還看了
const otherCourses = document.querySelector('.other-courses > ul')

// TODO 初始化時判斷該用戶是否已通過測試 => 需登入API串完才可以做
// TODO 渲染評論時判斷自己是否有點過讚 => 需登入API串完才可以做
// TODO 缺少評論點讚 => 需登入API串完才可以做

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.has('id') && urlParams.get('id');
const sort = urlParams.has('sort') && urlParams.get('sort');

let course; // 單頁課程資料
let comments; // 評論畫面列表
let user; // 用戶資料
async function updateUserInfo() {
  if(!localStorage.getItem('token')) {
    // 未登入狀態
    favoriteBtn.classList.add('d-none')
    classroomBtn.classList.add('d-none')
    return
  }

 user = await User.getUserInfo()
 console.log(user);
 if(!user) return
//  當前課程的收藏 icon
 favoriteBtn.classList.remove('d-none')
 if( user.favorites.find(item => Number(item.courseId) === Number(id))){
  favoriteIcon.classList.remove('outline-icon')
  }else{
  favoriteIcon.classList.add('outline-icon')
  }

  // 課程小測是否通過
  if(user.passes.some(item => Number(item.courseId) === Number(id))) {
    hasTestPassed()
  }
}
async function init() {
  try {
    await updateUserInfo()
    
    course = await Course.getCourse(id);
    comments = await Comment.getComments(1, 6, sort, 'desc', id);

    // 課程資料初始化
    renderCourse(course)
    // 中間評論初始化
    if(sort === 'timer') navBtn[0].classList.add('active')
    if(sort === 'likesNum') navBtn[1].classList.add('active')
    renderComment(comments)
    
    // 分類版面初始化
    renderPagination()

    // 下方更多課程初始化
    renderOthers()
  } catch (err) {
    console.log(err);
  }
}
function hasTestPassed() {
  testForm.classList.add('d-none')
  testPassed.classList.remove('d-none')
  classroomBtn.classList.remove('d-none')

}
// 上方課程畫面渲染
function renderCourse(course) {
  courseTitle.innerHTML = `
  <span class="bg-secondary text-white py-2 px-4 rounded-1 me-lg-3 me-2 mb-1 mb-lg-0">${course.platform
  }</span>
  <h1 class="page-title fs-lg-2 fs-4 fw-bold text-nowrap">
    ${course.title}
  </h1>
              `
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
}

// 中間評論畫面渲染
function renderComment(comments){
  // 該課程沒有評論
  if(!comments.data.length) {
    commentList.innerHTML = `<p class="text-center fs-3 py-4">當前課程尚未評論</p>`
    return
  }


  // 有評論內容
  commentList.innerHTML = comments.data.map((comment, index) => {
    const email = comment.user.email.split('@')[0]
    const hiddenName = `${email[0]}***${email[email.length -1]}`
    return `<li class="col-lg-4">
    <article
      class="fw-bold ${comment.theme ? 'course-page-comment' : 'comment-style0'} bg-${(index + 1) % 3 === 0 ? 'blue' : (index + 1) % 3 === 1 ? 'primary' : 'orange'} px-3 pb-3 d-flex flex-column h-100"
    >
    <div class="flex-grow-1">
        <div class="stars-icon d-flex float-end">
          <span class="material-symbols-outlined ${comment.score >= 1 ? '' : 'outline-icon'}">star</span>
          <span class="material-symbols-outlined ${comment.score >= 2 ? '' : 'outline-icon'}">star</span>
          <span class="material-symbols-outlined ${comment.score >= 3 ? '' : 'outline-icon'}">star</span>
          <span class="material-symbols-outlined ${comment.score >= 4 ? '' : 'outline-icon'}">star</span>
          <span class="material-symbols-outlined ${comment.score >= 5 ? '' : 'outline-icon'}">star</span>
        </div>
        <p class="fs-5 mb-2">${Number(comment.showName) ? comment.user.nickName : hiddenName}：</p>
        <div class="fs-6">
          ${comment.content}
        </div>
    </div>
      <div class="${localStorage.getItem('token') ? 'd-flex' : 'd-none'} align-items-center gap-2">
          <!-- 用 .active 控制是否點擊 -->
        <span class="thumb-up ${user && comment.likes.includes(user.id) ? 'active' : ''} material-symbols-outlined cur-point" data-comment="${comment.id}">
          thumb_up
          </span>
        <p class="mb-0">${comment.likesNum}</p>
      </div>
    </article>
  </li>`
  }).join('')
}

// 評論分頁切換 + 評論渲染
function renderPagination() {
  if(!comments.totalPages) { // 當前總分頁為 0  => 沒有評論內容
    pagination.innerHTML = ''
    return
  }



  let str = ''
  // 渲染分頁有幾頁 + 當前再第幾頁, 因為用了 innerHTML 重繪畫面, 所以事件監聽要寫在這裡面
  for (let page = 1; page <= comments.totalPages; page++) {
   str += `<li class="page-item p-hover ${comments.currentPage === page ? 'active' : ''}"><a class="page-link" href="#" data-link="${page}">${page}</a></li>`
  }
  pagination.innerHTML = `
  <li class="page-item p-hover">
      <a class="page-link ${comments.currentPage === 1 ? 'd-none' : ''}" href="#" aria-label="Previous" data-link="${comments.currentPage - 1}">
          <span aria-hidden="true">&laquo;</span>
      </a>
  </li>
  ${str}
  <li class="page-item p-hover">
      <a class="page-link ${comments.currentPage === comments.totalPages ? 'd-none' : ''}" href="#" aria-label="Next" data-link="${comments.currentPage + 1}">
          <span aria-hidden="true">&raquo;</span>
      </a>
  </li>`
  pagination.addEventListener('click', changePages)

  async function changePages (e) {
    e.preventDefault()
    e.stopPropagation();
    if(!e.target.dataset.link) return
    pagination.removeEventListener('click', changePages) // 重繪分頁記得要移除事件監聽

    if (e.target.dataset.link) {
      comments = await Comment.getComments(Number(e.target.dataset.link), 6, sort, 'desc', id);
    }

    renderComment(comments)
    renderPagination()
  }
}

// 下方更多課程畫面渲染
async function renderOthers() {
  const res = await Course.getAllCourses()
  const arr = [] // 有一樣標籤的課程
  res.forEach(total => {
    // Array.some: 查詢陣列內有沒有符合條件的值, 回傳 Boolean
    const sameTags = total.tags.some(tag => course.tags.includes(tag))
    // 如果有一樣的值的話, 放到 arr 空間去
    if(sameTags) {
      arr.push(total)
    }
  })

  // 再篩一次評價需要 3 以上 + 渲染畫面
  const final = arr.filter(item => item.avgScore >= 0)
  if(!final.length) {
    otherCourses.innerHTML = `
    <li class="flex-grow-1 text-center">
      <p class="fs-4">沒有相似課程</p>
      <a href="./course.html" class="btn btn-primary">來去逛逛</a>
    </li>
    `
    return
  }
  otherCourses.innerHTML = final.map(item => {
    return `
    <div class="swiper-slide">
      <li class="d-flex flex-column">
        <a class="card card-hover h-100 rounded-4 position-relative" href="./coursepages.html?id=${item.id}&sort=timer">
          <div class="pic">
            <img
              src="${item.cover}"
              alt="${item.title}"
              class="card-pic"
            />
          </div>
          <div
            class="badge d-flex justify-content-between align-items-center position-absolute"
          >
            <span
              class="brand bg-secondary small text-white rounded-1 py-1 px-3"
              >${item.platform}</span
            >
            
            <span
            class="${ localStorage.getItem('token') ? '' : 'd-none'} favorite others-favorite-btn material-symbols-outlined position-absolute ${localStorage.getItem('token') && item.favorites.some(userLike => userLike.userId === user.id) ? '' : 'outline-icon'}"
            data-id="${item.id}"
            >favorite</span
          >
          </div>
          <div class="card-body">
            <h3 class="title text-secondary fs-6 fw-bold text-truncate">${item.title}</h3>
          </div>
          <div class="card-footer">
            <div class="tags mb-2 mt-auto">
            ${item.tags.map(tag => `<span class="fs-8 me-2">#${tag}</span>`).join('')}
            </div>
            <div class="stars d-flex">
              <div class="stars-icon text-primary me-2">
                <span class="material-symbols-outlined ${item.avgScore >= 1 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined ${item.avgScore >= 2 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined ${item.avgScore >= 3 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined ${item.avgScore >= 4 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined ${item.avgScore >= 5 ? '' : 'outline-icon'}"
                  >star</span
                >
              </div>
              <span class="fs-8 text-gray-400">(${item.comments.length})</span>
            </div>
          </div>
        </a>
      </li>
    </div>
    `
  }).join('')

  // 每個課程內的關注按鈕點擊
  const otherBtn = document.querySelectorAll('.others-favorite-btn')
  otherBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      console.log(btn);

      // if(!e.target.dataset.id) return
        const index = user.favorites.findIndex(item => Number(item.courseId) === Number(e.target.dataset.id))
        if(index === -1) {
          // 加入
          await Favorites.add(id)
          btn.classList.remove('outline-icon')
        } else{
          const currId = user.favorites[index].id
          await Favorites.remove(currId)
          btn.classList.add('outline-icon')
        }
      await updateUserInfo()
    })
  })
}

init();

// 上方加入/移除關注
favoriteBtn.addEventListener('click', async (e) => {
  e.stopPropagation()
  const index = user.favorites.findIndex(item => Number(item.courseId) === Number(id))
  if(index === -1) {
    // 加入
    await Favorites.add(id)
  } else{
    // 移除
    const currId = user.favorites[index].id
    await Favorites.remove(currId)
  }
  await updateUserInfo()
  console.log(user);

})

// 評論區點讚
commentList.addEventListener('click', async (e)=>{
  if(!e.target.dataset.comment) return
  // 找到當前點擊的評論資料
  const current = comments.data.find(comment => comment.id === Number(e.target.dataset.comment))
  const { id, likes ,likesNum } = current
  if(likes.includes(user.id)) return // 點過讚的人
  // 點讚
  likes.push(user.id)
  const data = {
    likes,
    likesNum: likes.length
  }
  Comment.likeComment(id, data)
  renderComment(await Comment.getComments(Number(e.target.dataset.link), 6, sort, 'desc', id))
})

// 課堂小測提交
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

  if(!localStorage.getItem('token')) {
    // 用戶未登入
    Swal.fire({
      icon: 'error',
      title: '請加入會員',
      showConfirmButton: false,
      timer: 1500
    })
    return
  }

  // 驗證成功
  Passes.addPasses({
    userId: user.id, // 待串接, 先用假資料
    courseId: Number(id),
    isFinish: false
  })
  hasTestPassed()
});

// 評論分類切換
navBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    location.search = `?id=${id}&sort=${e.target.dataset.key}`
  })
})
