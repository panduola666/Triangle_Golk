// 專門用來寫新課申請 API
import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { CoursesApplies } from '../api/index';

const applyForm = document.querySelector('.apply-form');
const applyBtn = document.querySelector('.apply-btn');
const modal = document.querySelector('#apply-modal')
const applyModal = new Modal(modal);

let content;
applyBtn.addEventListener('click', () => applyModal.show());
applyForm.addEventListener('submit', function (event) {
  event.preventDefault(); // 阻止表單的默認提交行為

  // 關閉 modal
  if (
    !applyForm['course-name'].value ||
    !applyForm['brand-name'].value ||
    !applyForm['course-link'].value
  ) {
    return;
  }
  if (!content || content === '<p><br></p>') {
    Swal.fire({
      scrollbarPadding: false,
      icon: 'error',
      title: '請輸入理由',
    });
    return;
  }

  const param = {
    title: applyForm['course-name'].value,
    platform: applyForm['brand-name'].value,
    reason: applyForm['course-link'].value,
    url: content,
  };
  CoursesApplies.post(param);
  applyModal.hide();
});

modal.addEventListener('hidden.bs.modal', () => {
    applyForm.classList.remove('was-validated');
    editor.setHtml('');
    applyForm.reset();
})


// 富文本編輯器配置
const { createEditor, createToolbar } = window.wangEditor;

const editorConfig = {
  placeholder: '最多不超過 400 字',
  maxLength: 400, // 字數最大限制
  onChange(editor) {
    const html = editor.getHtml(); // 獲取用戶輸入的 html 結構
    content = html;
  },
};

const editor = createEditor({
  selector: '#editor-container',
  html: '<p><br></p>',
  config: editorConfig,
  mode: 'simple', // or 'simple'
});

const toolbarConfig = {
  toolbarKeys: ['bold', 'underline', 'italic', '|', 'undo', 'redo'], // 工具欄重新配置
};

const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: toolbarConfig,
  mode: 'default', // or 'simple'
});
