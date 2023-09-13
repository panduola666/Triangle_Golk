import Swal from 'sweetalert2';
import { Course } from '../api/course';

// 取得根據 url 參數篩選出來的全部課程資料
// 該資料包含 avgScore:平均分 comments:這個課程的全部評論 favorites:點讚這個課程的人id
// console.log(await Course.getAllCourses());

const favBtns = document.querySelectorAll(".favorite");

async function init() {
    try {
        if (!localStorage.getItem('token')) {
            // 如果用户未登入，隐藏收藏按钮
            favBtns.forEach((btn) => {
                btn.classList.add("d-none");
            });
        } else {
            favBtns.forEach((btn) => {
                btn.classList.remove("d-none");
            });
        }
    } catch (err) {
        console.log(err);
    }
}
init();

