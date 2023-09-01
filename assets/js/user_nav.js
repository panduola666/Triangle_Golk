// 獲取當前頁面的唯一標識符，假設它位於 URL 的最後一部分
var currentPage = window.location.href.split('/').pop().split('.')[0];

// 獲取所有導航連結
var navLinks = document.querySelectorAll('.nav-link');

// 迭代導航連結
navLinks.forEach(function(link) {
    // 獲取連結的 data-page 屬性值
    var page = link.getAttribute('data-page');
    
    // 如果 data-page 屬性值等於當前頁面的唯一標識符
    if (page === currentPage) {
        // 將 active 類名添加到連結上
        link.classList.add('active');
    }
});