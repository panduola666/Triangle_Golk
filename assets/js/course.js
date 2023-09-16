import Swal from 'sweetalert2';
import { Course } from '../api/course';
import { Favorites, User } from '../api';


// 取得根據 url 參數篩選出來的全部課程資料
// 該資料包含 avgScore:平均分 comments:這個課程的全部評論 favorites:點讚這個課程的人id
// console.log(await Course.getAllCourses());

const filterForm = document.querySelector(".filter-form");
const deleteBtn = document.querySelector("#delete-btn");
const favBtn = document.querySelector(".favorite");

let user;
async function init() {
  try {
    renderCourseList(1);
    await updateUserInfo();
    renderPagination();

  } catch (err) {
    console.log(err);
  }
}

init()

async function updateUserInfo() {
  try {
    if (!localStorage.getItem('token')) {
      // 如果用户未登入，隐藏收藏按鈕
      if (favBtn) {
        favBtn.forEach((btn) => {
          btn.classList.add("d-none");
        });
      }
    } else {
      if (favBtn) {
        favBtn.forEach((btn) => {
          btn.classList.remove("d-none");
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
  user = await User.getUserInfo()
}

async function renderCourseList(pageNum) {
  const courseList = document.querySelector(".course-list");
  const res = await Course.getAllCourses();
  // 更新總共幾筆資料
  totalItems = res.length;
  // 計算分頁範圍
  const startIndex = (pageNum - 1) * pageItems;
  const endIndex = startIndex + pageItems;

  let str = "";
  const currentPageData = res.slice(startIndex, endIndex);

  currentPageData.forEach((item) => {
    str += `<li class="col-lg-4 col-md-6 col-12 d-flex flex-column">
    <a class="card card-hover h-100 rounded-4" href="./coursepages.html?id=${item.id}&sort=timer">
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
          class="${localStorage.getItem('token') ? '' : 'd-none'} favorite text-white material-symbols-outlined outline-icon position-absolute" data-id="${item.id}"
          >favorite</span
        >
      </div>
      <div class="card-body">
        <h3 class="title text-secondary fs-6 fw-bold">
          ${item.title}
        </h3>
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
  </li>`
  });

  courseList.innerHTML = str;
  updatePaginationBtns();
}

const pagination = document.querySelector(".pagination");
const prevBtn = document.querySelector(".page-prev");
const nextBtn = document.querySelector(".page-next");
const pageItems = 6; // 每頁顯示的數量
let currentPage = 1; // 當前頁碼
let totalItems = 0; // 總共幾筆資料

function renderPagination() {
  pagination.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('page-link')) {
      // 獲取點擊的頁碼
      const targetPage = parseInt(e.target.dataset.page);

      if (!isNaN(targetPage)) {
        currentPage = targetPage; //更新目前頁碼
        renderCourseList(currentPage); // 渲染新頁面資料
      }
    }
  });
}

function updatePaginationBtns() {
  const totalPages = Math.ceil(totalItems / pageItems);

  pagination.innerHTML = '';

  // 添加上一頁按鈕
  if (currentPage > 1) {
    pagination.innerHTML += `
      <li class="page-item page-prev p-hover">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `;
    
  }

  // 添加頁碼按鈕
  for (let i = 1; i <= totalPages; i++) {
    const activeClass = i === currentPage ? 'active' : '';
    pagination.innerHTML += `
      <li class="page-item p-hover ${activeClass}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `;
  }

  const prevPageBtn = pagination.querySelector(".page-prev");
  prevPageBtn && prevPageBtn.addEventListener('click', () => {
      console.log(currentPage);
      if (currentPage > 1) {
        currentPage--; // 減少當前頁碼
        renderCourseList(currentPage); // 渲染新頁面資料
      }
    });
  // 添加下一頁按鈕
  if (currentPage < totalPages) {
    pagination.innerHTML += `
      <li class="page-item page-next p-hover">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `;
    const nextPageBtn = pagination.querySelector(".page-next");
    nextPageBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++; // 增加當前頁碼
        renderCourseList(currentPage); // 渲染新頁面資料
      }
    });
  }
}

filterForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');

  const platform = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      platform.push(`platform=${checkbox.value}`);
    }
  });
  let str = '?'
  str += platform.join('&')
  if (filterForm['search-bar'].value) {
    str += `${platform.length ? '&' : ''}q=${filterForm['search-bar'].value}`
  }
  location.href = `course.html${str === '?' ? '' : str}`
})

deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  filterForm['search-bar'].value = '';

  const checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });
})