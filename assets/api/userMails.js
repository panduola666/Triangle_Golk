import axios from 'axios';
const { VITE_BASEURL } = import.meta.env;
import Swal from 'sweetalert2';

export const UserMail = {
  async post(params) {
    try {
      const data = {
        ...params,
        userId: Number(localStorage.getItem('userId')),
        isReply: false,
      };
      const res = await axios.post(`${VITE_BASEURL}/userMails`, data);
      Swal.fire({
        scrollbarPadding: false,
        icon: 'success',
        title: '感謝您的留言，我們將於 7 - 14 天內給予您答覆！',
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false
      });
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
