import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env;

export const Course = {
  // 取得單一課程資料
  async getCourse(id) {
    try {
      const res = await axios.get(
        `${VITE_BASEURL}/courses/${id}?_embed=comments&_embed=passes`
      );
      // 計算課程平均分數
      const { comments = [] } = res.data;
      const avgScore =
        comments.reduce((total, item) => (total += Number(item.score)), 0) /
        (comments.length || 1); // 給分母一個預設值 1 , 不然當陣列為空的時候因不能除以 0 變成 NaN 錯誤
      return {
        ...res.data,
        avgScore: Math.floor(avgScore),
      };
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        const swal = await Swal.fire({
          scrollbarPadding: false,
          icon: 'error',
          text: '查無此課程',
        });
        if (swal.isConfirmed || swal.isDismissed) window.history.go(-1);
      }
    }
  },
  // 取的全部課程並計算課程的平均分
  async getAllCourses() {
    try {
      let res;
      const urlParams = new URLSearchParams(window.location.search);
      const platform =
        urlParams.has('platform') ? urlParams.getAll('platform') : [];
      const q = urlParams.has('q') ? urlParams.get('q') : '';
      
      if (window.location.search && !platform.includes('其他平台')) {
        // 有選擇性的搜尋
        res = await axios.get(
          `${VITE_BASEURL}/courses${window.location.search}&_embed=comments&_embed=favorites`
        );
      } else if (window.location.search) {
        // 有選擇性的搜尋
        platform.splice(platform.indexOf('其他平台'), 1)
        const allPlatform = ['六角學院', 'Udemy', 'Hahow', 'Coursera']
        // 沒有被選中的平台
        const notSearch = allPlatform.filter(item => !platform.includes(item))
        const queryData =  await axios.get(
            `${VITE_BASEURL}/courses?_embed=comments&_embed=favorites${q ? `&q=${q}` : ''}`
          );

          res = {
            ...queryData,
            data: queryData.data.filter(item => !notSearch.includes(item.platform))
          }
      } else {
        res = await axios.get(
          `${VITE_BASEURL}/courses?_embed=comments&_embed=favorites`
        );
      }

      // 計算課程平均分數
      const final = res.data.map((course) => {
        const { comments = [] } = course;

        const avgScore =
          comments.reduce((total, item) => (total += Number(item.score)), 0) /
          (comments.length || 1);

        return {
          ...course,
          avgScore: Math.floor(avgScore),
        };
      });
      return final;
    } catch (err) {
      console.log(err);
      const swal = await Swal.fire({
        scrollbarPadding: false,
        icon: 'error',
        text: '取得課程失敗',
      });
    }
  },
  async getNewThree() {
    try {
      const res = await axios.get(`${VITE_BASEURL}/courses?_sort=id&_order=desc&_limit=3&_embed=comments`);
       // 計算課程平均分數
       const final = res.data.map((course) => {
        const { comments = [] } = course;

        const avgScore =
          comments.reduce((total, item) => (total += Number(item.score)), 0) /
          (comments.length || 1);

        return {
          ...course,
          avgScore: Math.floor(avgScore),
        };
      });
      return final;
    } catch (err) {
      console.log(err);
    }
  }
};
