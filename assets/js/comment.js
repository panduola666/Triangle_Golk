import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'
import { Course, Comment } from '../api';


// TODO: 需要 1.當前課程id參數  2.userId  3.當前是新增還是編輯 4.選擇匿名跟實名需要用戶參數才可以使用

const currCourse = document.querySelector('#curr-course')
const courseForm = document.querySelector('#comment-form')
const startIcons = document.querySelector('.stars-icon')
const starts = startIcons.querySelectorAll('.material-symbols-outlined')
const commentContent = document.querySelector('.comment-content')
const commentView = document.querySelector('.comment-view')
const proveImg = document.querySelector('.prove-img')
const userName = document.querySelector('.comment-userName')

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.has('id') && urlParams.get('id') // 評論id => 編輯
const courseId = urlParams.has('courseId') && urlParams.get('courseId') // 課程 id => 新增
let params = {
  userId: 1, //先用假資料
  courseId,
  isPassed: -1,
  failContent: '',
  canEdit: true,
  theme: 0,
  likes: [],
  likesNum: 0
} // 完整表單參數
let text
const user = {
  nickName: '',
  email: ''
}

// 獲取初始化資料
async function init() {
  if(id) { // 編輯
   const res = await Comment.getCurrent(id)
   params = {...params,...res}
   user.nickName = res.user.nickName
   user.email = res.user.email.slice(0,res.user.email.indexOf('@'))
   // 編輯樣式初始化
   courseForm['course-img'].value = params.image
   courseForm['public-name'].value = params.showName

   finalStart(params.score)
   startHover()
   commentContent.innerHTML = params.content
   editor.setHtml(params.content)
   courseForm['comment-style'].value = params.theme
   renderCourseCard(params.course)
  } else{
    // 新增
    commentView.classList.add(`comment-style${params.theme}`)
    try{
      const res = await Course.getCourse(courseId)
      renderCourseCard(res)
    }
    catch(err) {
      location.href = '/pages/user_courses.html'
    }
  }
  isShowName(params.showName)
  renderProveImg(params.image)
  commentView.classList.add(`comment-style${params.theme}`)



}
init()

// 繪製當前課程 card 樣式
function renderCourseCard (data) {
  currCourse.innerHTML = `
  <div class="row g-0">
  <div class="col-5 col-lg-4 card-row">
    <img src="${data.cover}" class="img-fluid rounded-start"
      alt="${data.title}">
  </div>
  <div class="col">
    <div class="card-body">
      <h4 class="card-title text-truncate">${data.title}</h4>
    </div>
    <div class="card-footer">
    <div class="tags mb-2 mt-auto">
    ${data.tags.map(tag => (`<span class="fs-8 me-2">#${tag}</span>`)).join('')}
      </div>
    </div>
  </div>
</div>`
}
// 繪製完課證明圖片
function renderProveImg(data = '') {
  if(data) {
    proveImg.classList.remove('d-none')
    proveImg.setAttribute('src', data)
  } else {
    proveImg.classList.add('d-none')
  }
}

// 輸入網址後渲染圖片
courseForm['course-img'].addEventListener('change', (e) => renderProveImg(e.target.value))

// 名稱顯示更換
courseForm['public-name'].forEach(showName => {
  showName.addEventListener('change', (e) => isShowName(e.target.value))
})
function isShowName(value) {
  if(Number(value)) {
    userName.innerHTML = `${user.nickName}：`
  }else{
    userName.innerHTML = user.email ? `${user.email[0]}***${user.email[user.email.length - 1]}：` : '：'
  }
}


// 左側課程評分切換
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
// 右側課程評分 show
function finalStart(scores){
  const commentScore = document.querySelector('.comment-scores').querySelectorAll('.material-symbols-outlined')
  commentScore.forEach(start => {
    start.classList.add('outline-icon')
    if(start.getAttribute('value') <= scores )  start.classList.remove('outline-icon')
  })
}

// 切換評價主題
courseForm['comment-style'].forEach(themeInput => {
  themeInput.addEventListener('click', (e) => {
  commentView.classList.remove('comment-style1')
  commentView.classList.remove('comment-style0')
  commentView.classList.add(`comment-style${e.target.value}`)
  })
})

// 表單完成送出
courseForm.addEventListener('submit', (e) => {
  e.preventDefault()
  params.image =  courseForm['course-img'].value
  params.showName = courseForm['public-name'].value
  params.theme = courseForm['comment-style'].value

  courseForm['course-img'].classList.remove('is-invalid')
  courseForm.querySelector('.course-scores').classList.remove('is-invalid')
  courseForm.querySelector('.course-content').classList.remove('is-invalid')
  
  if(!params.image) {
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

  // 驗證全部通過
  // 修正型別
  const {courseId, userId, showName, score, theme, image, content, likes} = params
  const data = {
    courseId: Number(courseId),
    canEdit: true,
    image,
    showName: Number(showName),
    score:  Number(score),
    content,
    theme: Number(theme),
    isPassed: -1, // 重新審核
    failContent: '', // 清空失敗結果
    likes,
    likesNum: likes.length,
    timer: new Date().getTime(),
    userId: Number(userId)
  }
  if(params.id){
    // 編輯
    data.canEdit = false // 後續不可再編輯
    data.userId = Number(userId)

    Comment.editorComment(params.id, data)
  }else{
    // 新增
    Comment.addComment(data)
  }
})


// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '最多不超過 100 字',
    maxLength: 100, // 字數最大限制
    onChange(editor) {
      const html = editor.getHtml() // 獲取用戶輸入的 html 結構
      text = editor.getText()
      commentContent.innerHTML = html.replace(/<p><br><\/p>/g, "") // 把內容渲染到預覽頁面上
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

