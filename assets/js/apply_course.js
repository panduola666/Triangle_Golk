// 專門用來寫新課申請 API
import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'

import Swal from 'sweetalert2';

$('.apply-form').each(function (index) {
    $(this).on('submit', function (e) {
        e.preventDefault();
        $(this).addClass('was-validated');
    });
});

document.getElementById('apply-modal').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表單的默認提交行為

    // 關閉 modal
    $('#apply-modal').modal('hide');

    // 彈出 SweetAlert 視窗
    Swal.fire({
        scrollbarPadding: false,
        title: "已送出",
        icon: "success",
        text: "感謝您的推薦，我們將於 7-14 天內給予您答覆！",
        showConfirmButton: false,
        timer: 1500
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.apply-form');
    const inputFields = form.querySelectorAll('input, textarea');

    // 當表單提交時
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表單默認提交

        // 處理表單提交邏輯...

        // 清空輸入框的值
        inputFields.forEach(function (input) {
            input.value = '';
        });

        // 顯示 SweetAlert 窗口
        Swal.fire({
            scrollbarPadding: false,
            title: '成功！',
            text: '你的申請已成功提交。',
            icon: 'success',
            confirmButtonText: '確定'
        });
    });

    // 當輸入框被點擊時
    inputFields.forEach(function (input) {
        input.addEventListener('click', function () {
            input.value = ''; // 清空輸入框的值
        });
    });
});



// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '最多不超過 400 字',
    maxLength: 400, // 字數最大限制
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

const toolbarConfig = {
    toolbarKeys:['bold', 'underline', 'italic', '|','undo','redo'] // 工具欄重新配置
}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
