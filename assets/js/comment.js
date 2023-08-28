import 'https://unpkg.com/@wangeditor/editor@latest/dist/index.js'

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '最多不超過 100 字',
    maxLength: 100, // 字數最大限制
    onChange(editor) {
      const html = editor.getHtml()
      const text = editor.getText()
      console.log('editor content', html)
      // 也可以同步到 <textarea>
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

console.log(toolbar.getConfig().toolbarKeys
);
