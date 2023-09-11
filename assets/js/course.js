import Swal from 'sweetalert2';
import { Course } from '../api/course';

 // 取得根據 url 參數篩選出來的全部課程資料
 //  該資料包含 avgScore:平均分 comments:這個課程的全部評論 favorites:點讚這個課程的人id
// console.log(await Course.getAllCourses());

clickFavBtn()

// 點擊「收藏列表」時，判斷是否登入
// 登入才能加入收藏

// 待修正: 未登入時需隱藏愛心, 已登入時點籍行為是 添加/移除關注清單, 可參考課程內頁
function clickFavBtn() {
    const favBtn = document.querySelectorAll("#fav-btn");
    let hrefKeyword;

    favBtn.forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            hrefKeyword = e.target.dataset.href;

            if (!localStorage.getItem('token')) {
                //彈出 請先登入 視窗
                Swal.fire({
                    scrollbarPadding: false,
                    title: "請先登入"
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        // 在 SweetAlert2 彈窗關閉後跳出 登入 視窗
                        $('#account').modal('show');
                    }
                });

            } else {
                // location.href = './mywishlist.html';
            }
        })
    })
}

