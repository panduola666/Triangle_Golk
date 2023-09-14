import { Favorites, loading } from '../api/index';

const bookLeft = document.querySelector('.book-left')
const bootRight = document.querySelector('.boot-right')
const pcMarks = document.querySelector('.pc-marks')
const h5Marks = document.querySelector('.h5-marks')

let originData;
let filterData;
let curTag;

async function init() {
    try {
      loading()
      originData = await Favorites.getUserFavorites()
      // 把他們按照平台分類
      filterData = originData.reduce((obj, item) => {
        obj[item.course.platform]
          ? obj[item.course.platform].push(item)
          : obj['其他平台'].push(item);
          return obj
      }, {
        六角學院: [],
        Hahow: [],
        Udemy: [],
        Coursera: [],
        其他平台: [],
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

  // 渲染左右頁的課程內容
function renderBook(curData) {
    const { currentPage, totalPages, data } = curData
    bookLeft.innerHTML = `
    <div class="notebook-cards-group">
    ${data[0].map(item => (`
    <div class="notebook-card-frame">
        <div class="card wishlist-note-card mb-3">
        <div class="row g-0">
            <div class="col-4 card-row">
            <img src="${item.course.cover}" class="img-fluid rounded-start" alt="${item.course.title}">
            </div>
            <div class="col-8">
            <div class="card-body pb-1">
                <h2 class="card-title fs-6 text-truncate">${item.course.title}</h2>
                <div class="user-courses-tags d-flex gap-2 mb-2 mb-lg-3">
                ${item.course.tags.map(tag => `<span class="card-text fs-8">#${tag}</span>`).join('')}
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
            <div class="wishlist-note-card-btn d-flex justify-content-center flex-nowrap">
            <a href="./coursepages.html?id=${item.courseId}&sort=timer" target="_self" class="d-block text-white fs-5 align-self-center text-nowrap p-xxl">查看課程</a>
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
    <div class="notebook-card-frame">
        <div class="card wishlist-note-card mb-3">
          <span class="material-symbols-outlined outline-icon position-absolute end-0 top-0 text-secondary">heart_minus
          </span>
        <div class="row g-0">
            <div class="col-4 card-row">
            <img src="${item.course.cover}" class="img-fluid rounded-start" alt="${item.course.title}">
            </div>
            <div class="col-8">
            <div class="card-body pb-1">
                <h2 class="card-title fs-6 text-truncate">${item.course.title}</h2>
                <div class="user-courses-tags d-flex gap-2 mb-2 mb-lg-3">
                ${item.course.tags.map(tag => `<span class="card-text fs-8">#${tag}</span>`).join('')}
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
            <div class="wishlist-note-card-btn d-flex justify-content-center flex-nowrap">
            <a href="./coursepages.html?id=${item.courseId}&sort=timer" target="_self" class="d-block text-white fs-5 align-self-center text-nowrap p-xxl">查看課程</a>
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
  }
  function renderMark(){
    const tagsColor = ['teal', 'blue', 'orange', 'yellow', 'gray-200']
    pcMarks.innerHTML = Object.keys(filterData).map((tag, index) => {
      return`<li class="bookmark ${curTag === tag ? '' : 'bookmark-unselected'} mb-2 py-1 bg-${tagsColor[index]} cur-point" data-tag="${tag}">
      <span class="fs-tiny"> ${tag}(${filterData[tag].length})</span>
        </li>`
    }).join('')
    h5Marks.innerHTML = Object.keys(filterData).map((tag, index) => {
      return ` <li class="bookmark ${curTag === tag ? '' : 'bookmark-unselected'} me-1 py-1 bg-${tagsColor[index]} fs-tiny cur-point" data-tag="${tag}">
      <span class="d-block text-nowrap">${tag}</span>(${filterData[tag].length})
    </li>`}).join('')
  }


// 簡易分頁
function pagination(resData, page = 1, curTag, limit = 8) {
    // resData is object
  // resData[curTag] 可以替換成只要進行分頁的 Array 資料
  const totalPages = Math.ceil(resData[curTag].length / limit);
  const data = resData[curTag];

  if (page < 1) {
    // console.log('已經在第一頁');
    // 回傳第一頁資料
    return {
      totalPages,
      currentPage: page,
      data: halfSlice(data.slice(0, limit)),
    };
  }
  if (page > totalPages) {
    // console.log('已經最後一頁');
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