import { Comment } from '../api';


const modal = document.querySelector('.comment-modal')
const modalBtn = document.querySelectorAll('.modal-btn')

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