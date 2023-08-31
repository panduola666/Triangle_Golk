import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

//
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
})
// 當按下按鈕時，顯示 SweetAlert2 提示框
document.getElementById('contact-send').addEventListener('click', function() {
Swal.fire({
    title: 'Hello!',
    text: 'This is a SweetAlert2 alert!',
    icon: 'success',
    confirmButtonText: 'OK'
});
});