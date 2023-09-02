import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env;

export const Comment = {
  // 新增評論
  async addComment(params) {
    try {
      const res = await axios.post(`${VITE_BASEURL}/comments`, params);
      const swal = await Swal.fire({
        icon: 'success',
        text: '評價成功，我們將於 7-14 天內審核證明，若成功即可在課程頁面內查看自已的評價！',
        showConfirmButton: false,
        timer: 2000,
      });
      if (swal.isDismissed) location.href = '/pages/user_courses.html';
      return res.data;
    } catch (err) {
      console.log(err);
      const swal = await Swal.fire({
        icon: 'error',
        text: '新增評論失敗, 請聯繫客服處理',
      });
    }
  },
  // 修改評論
  async editorComment(id, params) {
    try {
      const res = await axios.patch(`${VITE_BASEURL}/comments/${id}`, params);
      const swal = await Swal.fire({
        icon: 'success',
        text: '修改評價成功，我們將於 7-14 天內審核證明，若成功即可在課程頁面內查看自已的評價！',
        showConfirmButton: false,
        timer: 2000,
      });
      if (swal.isDismissed) location.href = '/pages/user_courses.html';
      return res.data;
    } catch (err) {
      console.log(err);
      const swal = await Swal.fire({
        icon: 'error',
        text: '修改評論失敗, 請聯繫客服處理',
      });
      if (swal.isConfirmed || swal.isDismissed)
        location.href = '/pages/user_courses.html';
    }
  },
  // 獲得當前 id 的評論
  async getCurrent(id) {
    try {
      const res = await axios.get(
        `${VITE_BASEURL}/comments/${id}?_expand=user&_expand=course`
      );

      return res.data;
    } catch (err) {
      console.log(err);
      const swal = await Swal.fire({
        icon: 'error',
        text: '查無此評論',
      });
      if (swal.isConfirmed || swal.isDismissed)
        location.href = '/pages/user_courses.html';
    }
  },
  /**
   *
   * @param {*} page 獲取第幾頁的資料, 默認為第一頁
   * @param {*} limit 限制當前頁數有幾個評論資料, 默認為 6
   * @param {*} sort 評論已甚麼為排序
   * @param {*} order asc:升序 desc:降序
   * @returns
   */
  async getComments(page = 1, limit = 6, sort='timer', order = 'desc', courseId) {
    try {
      const total = await axios.get(`${VITE_BASEURL}/comments?courseId=${courseId}`);
      const res = await axios.get(
        `${VITE_BASEURL}/comments?courseId=${courseId}&_expand=user&_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
      );
      return {
        totalPages: Math.ceil(total.data.length / 6), // 儀控幾頁
        currentPage: page, // 當前在第幾頁
        data: res.data, // 分頁完成後的資料
      };
    } catch (err) {
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '獲取評論失敗',
      });
    }
  }, 
  // 評論點讚
  async likeComment (id, data) {
    try {
      const res = await axios.patch(`${VITE_BASEURL}/comments/${id}`, data);
      console.log(res);
      // const swal = await Swal.fire({
      //   icon: 'success',
      //   text: '評價成功，我們將於 7-14 天內審核證明，若成功即可在課程頁面內查看自已的評價！',
      //   showConfirmButton: false,
      //   timer: 2000,
      // });
      // if (swal.isDismissed) location.href = '/pages/user_courses.html';
      // return res.data;
    } catch (err) {
      console.log(err);
      // const swal = await Swal.fire({
      //   icon: 'error',
      //   text: '新增評論失敗, 請聯繫客服處理',
      // });
    }
  }
};
