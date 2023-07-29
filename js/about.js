import { About, User } from '../api/index'

const content = document.querySelector('.content')
const userContent = document.querySelector('.user-content')

content.textContent = About.content
// ['我是user內容1','我是user內容2']

let user = ""
User.content.forEach(item => {
    user += `<li>${item}</li>`
    userContent.innerHTML = user
})
console.log(user);