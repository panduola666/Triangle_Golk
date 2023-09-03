import Swiper from "swiper";
//跳轉至變更密碼
const swiper = new Swiper('.swiper-container', {
    initialSlide: 0, // 初始顯示的頁面
    navigation: {
        nextEl: '#next-btn', // 下一頁按鈕
        prevEl: '.swiper-prev-btn'  // 上一頁按鈕
    },
    allowTouchMove: false, // 禁止手指滑動
    spaceBetween: 20,
});

document.getElementById('next-btn').addEventListener('click', function () {
    swiper.slideNext();
});

document.getElementById('prev-btn').addEventListener('click', function () {
    swiper.slidePrev();
});


//頭像修改成功彈窗
const successMessage = document.querySelector('#success-message')
successMessage.addEventListener('click', function () {
    Swal.fire({
        title: "修改成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
    $('#pic-modal').modal('hide');
})