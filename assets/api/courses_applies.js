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
      Swal.fire({
        scrollbarPadding: false,
        title: '已送出',
        icon: 'success',
        text: '感謝您的推薦，我們將於 7-14 天內給予您答覆！',
        showConfirmButton: false,
        timer: 1500,
      });
     const user = await axios.get(`${VITE_BASEURL}/users/${localStorage.getItem('userId')}`);
     const { avatars } = user.data
     if(!avatars.includes(5)) {
      avatars.push(5)
      await axios.patch(`${VITE_BASEURL}/users/${localStorage.getItem('userId')}`, {avatars});
      Swal.fire({
        scrollbarPadding: false,
        title: `恭喜您獲得新徽章`,
        showConfirmButton: false,
        timer: 2500,
        allowOutsideClick: false
    })
     }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};
