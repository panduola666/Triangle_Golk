import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'
import { UserMail } from '../api'

const contactForm = document.querySelector('.contact-form')
const contentBox = contactForm.querySelector('.form-content')
const emailInput = contactForm.querySelector('#contact-email')
const emailError = contactForm.querySelector('.email-error')

// 當按下按鈕時，顯示 SweetAlert2 提示框
let content;
emailInput.addEventListener('input', (e)=> {
   const { value } = e.target
   if(!value) {
    emailError.textContent = '信箱不得為空'
}
if(!checkMail(value)){
    emailError.textContent = '信箱格式錯誤'
}
})
contactForm.addEventListener('submit',(e) => {
    e.preventDefault()
    const nickName = contactForm['contact-nickname'].value
    const mail = contactForm['contact-email'].value
    if(!content || content === '<p><br></p>') {
        contentBox.classList.add('is-invalid')
    } else {
        contentBox.classList.remove('is-invalid')
    }
        console.log(contactForm.querySelectorAll('.invalid-feedback'));
    if(!nickName || !mail || !checkMail(mail) || !content || content === '<p><br></p>') {
        return
    }
    const params = {
        nickName,
        mail,
        content
    }
    UserMail.post(params)
    console.log(params);
})

function checkMail(value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}


// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '請輸入留言內容',
    onChange(editor) {
      const html = editor.getHtml() // 獲取用戶輸入的 html 結構
      content = html
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'simple', // or 'simple'
})

