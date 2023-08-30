import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'
import { Course } from '../api';

const currCourse = document.querySelector('#curr-course')
const courseForm = document.querySelector('#comment-form')
const startIcons = document.querySelector('.stars-icon')
const starts = startIcons.querySelectorAll('.material-symbols-outlined')

const params = {} // 完整表單參數

// 獲取初始化資料
function init() {
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
  })
  start.addEventListener('mouseenter', startHover)
  start.removeEventListener('mouseleave', startHover)
})
function startHover (e) {
  const scores = params.score || e.target.getAttribute('value') // 分數
  starts.forEach(item => {
   item.classList.add('outline-icon')
   if(item.getAttribute('value') <= scores )  item.classList.remove('outline-icon')
  })
}


// 表單完成送出
courseForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(courseForm)
  params.courseImg =  formData.get('course-img')
  params.showName = formData.get('public-name')
  params.theme = formData.get('comment-style')

  console.log(params);
})


// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '最多不超過 100 字',
    maxLength: 100, // 字數最大限制
    onChange(editor) {
      const html = editor.getHtml() // 獲取用戶輸入的 html 結構
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

