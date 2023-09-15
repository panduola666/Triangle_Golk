import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env;

export const Avatars = {
  // 獲取頭像
  async getTotal() {
    try {
      const res = await axios.get(`${VITE_BASEURL}/avatars`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
  // 設置頭像
  async setAvatar(id) {
    try {
      const res = await axios.patch(`${VITE_BASEURL}/users/${localStorage.getItem('userId')}`, {
        avatarId: Number(id)
      });
      Swal.fire({
        scrollbarPadding: false,
        icon: 'success',
        title: '頭像變更成功',
        showConfirmButton: false,
        timer: 1500
      })
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}