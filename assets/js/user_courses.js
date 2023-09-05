import { Comment } from '../api';
import { Passes, User } from '../api/index'
// DOM
const modal = document.querySelector('.comment-modal')
const modalBtn = document.querySelectorAll('.modal-btn')

// const originData = await Passes.getUserPasses()
// const user = await User.getUserInfo()

modalBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {
       const res = await Comment.getCurrent(btn.dataset.id)
       const { id, score, showName, user, content, canEdit, failContent, isPassed } = res
       const email = user.email.slice(0, user.email.indexOf('@'))

       modal.innerHTML = `
       <article class="modal-content bg-secondary text-primary fw-bold comment-style1">
      <div class="translate-middle-y">
        <button class="btn btn-outline-primary rounded-circle float-end" data-bs-dismiss="modal">X</button>
      </div>
      <div>
        <div class="stars-icon d-flex text-primary float-end">
            <span class="material-symbols-outlined ${score >= 1 ? '' : 'outline-icon'}">star</span>
            <span class="material-symbols-outlined ${score >= 2 ? '' : 'outline-icon'}">star</span>
            <span class="material-symbols-outlined ${score >= 3 ? '' : 'outline-icon'}">star</span>
            <span class="material-symbols-outlined ${score >= 4 ? '' : 'outline-icon'}">star</span>
            <span class="material-symbols-outlined ${score >= 5 ? '' : 'outline-icon'}">star</span>
        </div>
          <p class="fs-5">${showName ? user.nickName : `${email[0]}***${email[email.length -1]}`}：</p>
      </div>
      <div class="fs-4 mb-0">${content}</div>
      <div>
        <!-- 課程審核進度 -->
        ${isPassed === -1 ? `<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">審核中</button>` : isPassed === 0 ? `<button type="button" class="btn btn-danger btn-state float-end" data-bs-dismiss="modal">${failContent}</button>` : ''}
        <!-- 編輯 icon -->
        ${canEdit && isPassed !== -1 ? `<a href="./comment.html?id=${id}" class="material-symbols-outlined outline-icon cur-point ${isPassed === 1 && 'float-end'}">edit_square</a>` : ''}
      </div>
    </article>`
    })
})


// 把他們按照平台分類
const filterData = originData.reduce((obj, item) => {
    // 把此用戶該課程的評論加進去回傳
    const data = {
        ...item,
        comment: user.comments.find(comment => comment.courseId === item.courseId) || {}
    }
    obj[item.course.platform] ? obj[item.course.platform].push(data) : obj[item.course.platform] = [data]
    return obj
}, {})

// 簡易分頁
function pagination(page = 1, limit = 2 , curTag = '六角學院') {
    // filterData[curTag] 可以替換成只要進行分頁的 Array 資料
    const totalPages = Math.ceil(filterData[curTag].length / limit)
    const data = filterData[curTag]

    if(page < 1){
        console.log('已經在第一頁');
        // 回傳第一頁資料
        return {
            totalPages,
            currentPage: page,
            data: data.slice(0, limit)
        }
    }
    if(page > totalPages) {
        console.log('已經最後一頁');
        // 回傳最後一頁資料
        return {
            totalPages,
            currentPage: page,
            data: data.slice(data.length - limit)
        }
    }

    return {
        totalPages,
        currentPage: page,
        data: data.slice((page * limit) - limit, (page * limit))
    }
}
const test = pagination(1, 3)
console.log(test);
