import Swal from 'sweetalert2';

clickFavBtn()

// 點擊「收藏列表」時，判斷是否登入
// 登入才能加入收藏
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
                    title: "請先登入"
                }).then((result) => {
                    if (result.isConfirmed || result.isDismissed) {
                        // 在 SweetAlert2 彈窗關閉後跳出 登入 視窗
                        $('#account').modal('show');
                    }
                });

            } else {
                location.href = './mywishlist.html';
            }
        })
    })
}

