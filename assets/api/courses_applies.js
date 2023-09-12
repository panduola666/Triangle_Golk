import axios from 'axios';
const { VITE_BASEURL } = import.meta.env;
import Swal from 'sweetalert2';

export const CoursesApplies = {
  async post(params) {
    try {
      const data = {
        ...params,
        userId: Number(localStorage.getItem('userId')),
        timer: new Date().getTime(),
        isPassed: -1
      };
      const res = await axios.post(`${VITE_BASEURL}/coursesApplies`, data);
      console.log(res);
      Swal.fire({
        scrollbarPadding: false,
        title: '已送出',
        icon: 'success',
        text: '感謝您的推薦，我們將於 7-14 天內給予您答覆！',
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
