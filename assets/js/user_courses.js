import { Comment } from '../api';
import { Passes, User, loading } from '../api/index';
// DOM
const notebook = document.querySelector('.notebook')
const bookLeft = document.querySelector('.book-left')
const bootRight = document.querySelector('.boot-right')
const modal = document.querySelector('.comment-modal');
const pcMarks = document.querySelector('.pc-marks')
const h5Marks = document.querySelector('.h5-marks')

// TODO: 側邊標籤還未篩選渲染, 先確認頁面樣式修正


let originData;
let user;
let filterData;
let curTag;
async function init() {
  try {
    loading()
    originData = await Passes.getUserPasses();
    user = await User.getUserInfo();

    // 把他們按照平台分類
    filterData = originData.reduce((obj, item) => {
      // 把此用戶該課程的評論加進去回傳
      const data = {
        ...item,
        comment:
          user.comments.find((comment) => comment.courseId === item.courseId) ||
          {},
      };
      obj[item.course.platform]
        ? obj[item.course.platform].push(data)
        : obj['其他平台'].push(data);
        item.isFinish && obj['已完課'].push(data)
        return obj
    }, {
      六角學院: [],
      Hahow: [],
      Udemy: [],
      Coursera: [],
      其他平台: [],
      已完課: []
    });
    loading(filterData)

    curTag = Object.keys(filterData)[0]
    renderBook(pagination(filterData, 1, curTag))
    renderMark()
  } catch (error) {
    console.log(error);
  }
}
init();

notebook.addEventListener('click', (e) => {
  const { page } = e.target.dataset
  if(!page) return
  renderBook(pagination(filterData, Number(page), curTag))
})

// 渲染左右頁的課程內容
function renderBook(curData) {
  console.log(curData);
  const { currentPage, totalPages, data } = curData
  bookLeft.innerHTML = `
  <div class="notebook-cards-group">
  ${data[0].map(item => (`
  <div class="notebook-card-frame position-relative">
    <span class="comment-alerttag bg-danger small text-white rounded-1 py-1 px-3 position-absolute ${item.comment.isPassed !== 0 ? 'd-none' : ''}">未過審</span>
    <div class="card single-note-card mb-3">
    <div class="row g-0">
      <div class="col-4 card-row">
        <img src="${item.course.cover}" class="img-fluid rounded-start" alt="${item.course.title}">
      </div>
      <div class="col-8">
        <div class="card-body pb-1">
          <h2 class="card-title fs-6 text-truncate">${item.course.title}</h2>
          <div class="user-courses-tags mb-2 mb-lg-3">
          ${item.course.tags.map(tag => `<span>#${tag}</span>`).join('')}
          </div>
          <div class="stars d-flex justify-content-end">
            <div class="stars-icon text-primary me-1 me-md-2">
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 1 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 2 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 3 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 4 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 5 ? '' : 'outline-icon'}">star</span>
            </div>
            <span class="text-gray-400 small">(${item.totalComment})</span>
          </div>
        </div>
      </div>
      <div class="single-note-card-btn d-flex justify-content-evenly align-items-center">
        <button class="check-course btn btn-primary "><a href="./coursepages.html?id=${item.course.id}&sort=timer">查看課程</a></button>
        <div class="vertical-line"></div>
        <button class="go-comment btn btn-outline-primary ${item.comment.id ? 'd-none': 'd-block'}">
          <a href="./comment.html?courseId=${item.courseId}">完課評價</a>
        </button>
        <button type="button" class="btn btn-secondary modal-btn ${item.comment.id ? 'd-block': 'd-none'}" data-bs-toggle="modal" data-bs-target="#course-comment" data-id="1">
        我的評價
      </button>
      </div>
    </div>
    </div>
  </div>
  `)).join('')}
  </div>
  <div class="d-none ${totalPages ? 'd-lg-block' : ''} justify-content-lg-start">
    <button class="btn btn-secondary px-2 py-1 mt-3 small ${currentPage === 1 ? 'd-none' : ''}" data-page="${currentPage - 1}">上一頁</button>
  </div>
  `
  bootRight.innerHTML = `
  <div class="notebook-cards-group">
  ${data[1].map(item => (`
  <div class="notebook-card-frame position-relative">
    <span class="comment-alerttag bg-danger small text-white rounded-1 py-1 px-3 position-absolute ${item.comment.isPassed !== 0 ? 'd-none' : ''}">未過審</span>
    <div class="card single-note-card mb-3">
    <div class="row g-0">
      <div class="col-4 card-row">
        <img src="${item.course.cover}" class="img-fluid rounded-start" alt="${item.course.title}">
      </div>
      <div class="col-8">
        <div class="card-body pb-1">
          <h2 class="card-title fs-6 text-truncate">${item.course.title}</h2>
          <div class="user-courses-tags mb-2 mb-lg-3">${item.course.tags.map(tag => `<span>#${tag}</span>`).join('')}</div>
          <div class="stars d-flex justify-content-end">
            <div class="stars-icon text-primary me-1 me-md-2">
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 1 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 2 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 3 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 4 ? '' : 'outline-icon'}">star</span>
                <span class="material-symbols-outlined star-fs ${item.avgScore >= 5 ? '' : 'outline-icon'}">star</span>
            </div>
            <span class="text-gray-400 small">(${item.totalComment})</span>
          </div>
        </div>
      </div>
      <div class="single-note-card-btn d-flex justify-content-evenly align-items-center">
        <button class="check-course btn btn-primary "><a href="./coursepages.html?id=${item.course.id}&sort=timer">查看課程</a></button>
        <div class="vertical-line"></div>
        <button class="go-comment btn btn-outline-primary ${item.comment.id ? 'd-none': 'd-block'}">
          <a href="./comment.html?courseId=${item.courseId}">完課評價</a>
        </button>
        <button type="button" class="btn btn-secondary modal-btn ${item.comment.id ? 'd-block': 'd-none'}" data-bs-toggle="modal" data-bs-target="#course-comment" data-id="1">
        我的評價
      </button>
      </div>
    </div>
    </div>
  </div>
  `)).join('')}
  </div>
  <div class="d-flex justify-content-between justify-content-lg-end ${totalPages ? '' : 'd-none'}">
    <div class="d-lg-none">
      <button class="btn btn-secondary px-2 py-1 mt-3 small ${currentPage === 1 ? 'd-none' : ''}" data-page="${currentPage - 1}">上一頁</button>
    </div>
    <button class="btn btn-secondary px-2 py-1 mt-3 small ${currentPage === totalPages ? 'd-none' : ''}" data-page="${currentPage + 1}">下一頁</button>
  </div>
  `


  const modalBtn = document.querySelectorAll('.modal-btn');

    modalBtn.forEach((btn) => {
      btn.addEventListener('click', () => renderModal(btn));
    });
}
function renderMark(){
  const tagsColor = ['teal', 'blue', 'orange', 'yellow', 'gray-200', 'primary']
  pcMarks.innerHTML = Object.keys(filterData).map((tag, index) => {
    return `<li class="bookmark ${curTag === tag ? '' : 'bookmark-unselected'} mb-2 py-1 bg-${tagsColor[index]} cur-point" data-tag="${tag}">
    <span class="fs-tiny">${tag}(${filterData[tag].length})</span>
      </li>`
  }).join('')
  h5Marks.innerHTML = Object.keys(filterData).map((tag, index) => {
    return ` <li class="bookmark ${curTag === tag ? '' : 'bookmark-unselected'} ${tag === '已完課'? 'ms-auto' : 'me-1'} py-1 bg-${tagsColor[index]} fs-tiny cur-point" data-tag="${tag}">
    ${tag}(${filterData[tag].length})
  </li>`}).join('')
}

// 渲染評價 modal
async function renderModal(btn) {
  const res = await Comment.getCurrent(btn.dataset.id);
  const {
    id,
    score,
    showName,
    user,
    content,
    canEdit,
    failContent,
    isPassed,
  } = res;
  const email = user.email.slice(0, user.email.indexOf('@'));

  modal.innerHTML = `
     <article class="modal-content bg-secondary text-primary fw-bold comment-style1">
    <div class="translate-middle-y">
      <button class="btn btn-outline-primary rounded-circle float-end" data-bs-dismiss="modal">X</button>
    </div>
    <div>
      <div class="stars-icon d-flex text-primary float-end">
          <span class="material-symbols-outlined ${
            score >= 1 ? '' : 'outline-icon'
          }">star</span>
          <span class="material-symbols-outlined ${
            score >= 2 ? '' : 'outline-icon'
          }">star</span>
          <span class="material-symbols-outlined ${
            score >= 3 ? '' : 'outline-icon'
          }">star</span>
          <span class="material-symbols-outlined ${
            score >= 4 ? '' : 'outline-icon'
          }">star</span>
          <span class="material-symbols-outlined ${
            score >= 5 ? '' : 'outline-icon'
          }">star</span>
      </div>
        <p class="fs-5">${
          showName
            ? user.nickName
            : `${email[0]}***${email[email.length - 1]}`
        }：</p>
    </div>
    <div class="fs-4 mb-0">${content}</div>
    <div>
      <!-- 課程審核進度 -->
      ${
        isPassed === -1
          ? `<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">審核中</button>`
          : isPassed === 0
          ? `<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">${failContent}</button>`
          : ''
      }
      <!-- 編輯 icon -->
      ${
        canEdit && isPassed !== -1
          ? `<a href="./comment.html?id=${id}" class="material-symbols-outlined outline-icon cur-point ${
              isPassed === 1 && 'float-end'
            }">edit_square</a>`
          : ''
      }
    </div>
  </article>`;
}

// 簡易分頁
function pagination(resData, page = 1, curTag, limit = 8) {
    // resData is object
  // resData[curTag] 可以替換成只要進行分頁的 Array 資料
  const totalPages = Math.ceil(resData[curTag].length / limit);
  const data = resData[curTag];

  if (page < 1) {
    console.log('已經在第一頁');
    // 回傳第一頁資料
    return {
      totalPages,
      currentPage: page,
      data: halfSlice(data.slice(0, limit)),
    };
  }
  if (page > totalPages) {
    console.log('已經最後一頁');
    // 回傳最後一頁資料
    return {
      totalPages,
      currentPage: page,
      data: halfSlice(data.slice(data.length - limit)),
    };
  }
  return {
    totalPages,
    currentPage: page,
    data: halfSlice(data.slice(page * limit - limit, page * limit)),
  };
}

function halfSlice(data) {
  // 每頁 4 個資料
  return [data.slice(0, 4),data.slice(4)]
}

pcMarks.addEventListener('click', (e) => {
  if(!e.target.dataset.tag) return
  curTag = e.target.dataset.tag
  renderBook(pagination(filterData, 1, curTag))
  renderMark()
})
h5Marks.addEventListener('click', (e) => {
  if(!e.target.dataset.tag) return
  curTag = e.target.dataset.tag
  renderBook(pagination(filterData, 1, curTag))
  renderMark()
})

