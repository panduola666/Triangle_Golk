import axios from "axios";
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env

export const Course = {
    // 取得單一課程資料
    async getCourse(id) {
        try {
             const res = await axios.get(`${VITE_BASEURL}/courses/${id}?_embed=comments&_embed=passes`);
             // 計算課程平均分數
             const { comments =[] } = res.data
             const avgScore = comments.reduce((total, item) => total += Number(item.score) ,0) / (comments.length || 1) // 給分母一個預設值 1 , 不然當陣列為空的時候因不能除以 0 變成 NaN 錯誤
             return {
                ...res.data,
                avgScore: Math.floor(avgScore)
             };
         } catch (err) {
             console.log(err);
             if(err.response.status === 404) {
               const swal = await Swal.fire({
                    icon: 'error',
                    text: '查無此課程'
                })
                if (swal.isConfirmed || swal.isDismissed)  window.history.go(-1);
             }
         }
      },
    // 取的全部課程並計算課程的平均分
    async getAllCourses() {
        try {
            const res = await axios.get(`${VITE_BASEURL}/courses?_embed=comments&_embed=favorites`);
            // 計算課程平均分數
           const final = res.data.map(course => {
                const { comments = [] } = course
                
                const avgScore = comments.reduce((total, item) => total += Number(item.score) ,0) / (comments.length || 1)
    
                return {
                    ...course,
                    avgScore: Math.floor(avgScore)
                 };
            })
            return final
        } catch (err) {
            console.log(err);
            const swal = await Swal.fire({
                 icon: 'error',
                 text: '取得課程失敗'
             })
        }
    }
}
