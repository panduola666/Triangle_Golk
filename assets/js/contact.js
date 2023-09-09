import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'
import Swal from 'sweetalert2';
// Swal.fire({
//     scrollbarPadding: false,
//     position: 'top-end',
//     icon: 'success',
//     title: 'Your work has been saved',
//     showConfirmButton: false,
//     timer: 1500
// })
// 當按下按鈕時，顯示 SweetAlert2 提示框
document.getElementById('contact-send').addEventListener('click', function() {
Swal.fire({
    scrollbarPadding: false,
    title: 'Hello!',
    text: 'This is a SweetAlert2 alert!',
    icon: 'success',
    confirmButtonText: 'OK'
});
});



// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '請輸入留言內容',
    onChange(editor) {
      const html = editor.getHtml() // 獲取用戶輸入的 html 結構
    console.log(html);
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'simple', // or 'simple'
})

