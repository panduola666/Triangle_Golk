import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'
import { Course } from '../api';

// TODO: 需要 1.當前課程id參數  2.userId  3.當前是新增還是編輯

const currCourse = document.querySelector('#curr-course')
const courseForm = document.querySelector('#comment-form')
const startIcons = document.querySelector('.stars-icon')
const starts = startIcons.querySelectorAll('.material-symbols-outlined')

const params = {
  "userId": 1, // 需參數
  "courseId": 1, // 需參數
  "canEdit": true,
  "isPAssed": -1,
  "failContent": "",
} // 完整表單參數
let text

// 獲取初始化資料
function init() {
  // 新增 or 編輯參數
  const config = 'new' // 假裝是新增參數
  params.likes = config === 'new' ? [] : params.likes
  Course.getCourse(1).then(res => {
      currCourse.innerHTML = `
      <div class="row g-0">
      <div class="col-5 col-lg-4">
        <img src="${res.cover}" class="img-fluid rounded-start"
          alt="${res.title}">
      </div>
      <div class="col">
        <div class="card-body">
          <h4 class="card-title text-truncate">${res.title}</h4>
        </div>
        <div class="card-footer">
        <div class="tags mb-2 mt-auto">
        ${res.tag.map(tag => (`<span class="fs-8 me-2">#${tag}</span>`)).join('')}
          </div>
        </div>
      </div>
    </div>`
  })
}
init()

// 評分
starts.forEach(start => {
  start.addEventListener('click', (e) => {
    params.score = e.target.getAttribute('value')
    startHover(e)
    finalStart(params.score)
  })
  start.addEventListener('mouseenter', startHover)
  start.addEventListener('mouseleave', () => {
    if(!params.score) {
      starts.forEach(item => {
        item.classList.add('outline-icon')
       })
    }
  })
})
function startHover (e) {
  const scores = params.score || e.target.getAttribute('value') // 分數
  starts.forEach(item => {
   item.classList.add('outline-icon')
   if(item.getAttribute('value') <= scores )  item.classList.remove('outline-icon')
  })
}
// 最終評價 show 出來的評分
function finalStart(scores){
  const commentScore = document.querySelector('.comment-scores').querySelectorAll('.material-symbols-outlined')
  commentScore.forEach(start => {
    start.classList.add('outline-icon')
    if(start.getAttribute('value') <= scores )  start.classList.remove('outline-icon')
  })
}


// 表單完成送出
courseForm.addEventListener('submit', (e) => {
  e.preventDefault()
  params.image =  courseForm['course-img'].value
  params.showName = courseForm['public-name'].value
  params.theme = courseForm['comment-style'].value
  params.timer = new Date().getTime()

  courseForm['course-img'].classList.remove('is-invalid')
  courseForm.querySelector('.course-scores').classList.remove('is-invalid')
  courseForm.querySelector('.course-content').classList.remove('is-invalid')
  
  if(!params.courseImg) {
    courseForm['course-img'].classList.add('is-invalid')
  }
  if(!params.score) {
    courseForm.querySelector('.course-scores').classList.add('is-invalid')
    courseForm.querySelector('.course-scores').classList.add('fw-bold')
  }
  if(!text.trim().length) {
    courseForm.querySelector('.course-content').classList.add('is-invalid')
    courseForm.querySelector('.course-content').classList.add('fw-bold')
  }
  const errorDom = courseForm.querySelector('.is-invalid')
  if(errorDom) {
    errorDom.focus()
    window.scrollTo({top: errorDom.offsetTop - 100})
  }
  if(errorDom) return


  console.log(params);
})


// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '最多不超過 100 字',
    maxLength: 100, // 字數最大限制
    onChange(editor) {
      const html = editor.getHtml() // 獲取用戶輸入的 html 結構
      text = editor.getText()
      params.content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'simple', // or 'simple'
})

const toolbarConfig = {
    toolbarKeys:['bold', 'underline', 'italic', '|','undo','redo'] // 工具欄重新配置
}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

