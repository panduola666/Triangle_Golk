import Swal from 'sweetalert2';

const resetForm = document.querySelector(".reset-form");
const newPwd = document.querySelector("#new-password");
const confirmPwd = document.querySelector("#confirm_password");

resetForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newPwdValue = newPwd.value.trim();
    const confirmPwdValue = confirmPwd.value.trim();

    newPwd.classList.remove('is-invalid');
    confirmPwd.classList.remove('is-invalid');

    if (newPwdValue === '' || confirmPwdValue === '') {
        setErrorFor(newPwd, '欄位不得為空');
        setErrorFor(confirmPwd, '欄位不得為空');
    } else if (newPwdValue !== confirmPwdValue) {
        Swal.fire({
            scrollbarPadding: false,
            icon: 'error',
            title: '密碼不一致'
        });
    } else if (newPwdValue.length < 6 || confirmPwdValue.length < 6) {
        setErrorFor(newPwd, '密碼至少需要6個字元');
        setErrorFor(confirmPwd, '密碼至少需要6個字元');
        Swal.fire({
            scrollbarPadding: false,
            icon: 'error',
            title: '密碼至少需要6個字元'
        });
    } else {
        setSuccessFor(confirmPwd);
        newPwd.classList.add('is-invalid');
        confirmPwd.classList.add('is-invalid');
        Swal.fire({
            scrollbarPadding: false,
            icon: 'success',
            title: '重設密碼成功'
        }).then((result) => {
            if (result.isDismissed || result.isConfirmed) {
                location.href = 'index.html';
            }
        });
    }
})

function setErrorFor(input, message) {
    const formFloating = input.parentElement;
    const errTxt = formFloating.querySelector('.invalid-feedback');
    errTxt.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
}