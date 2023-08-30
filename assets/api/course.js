import axios from "axios";
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env

export const Course = {
    // 取得單一課程資料
    async getCourse(id) {
        try {
             const res = await axios.get(`${VITE_BASEURL}/courses/${id}`);
             return res.data;
         } catch (err) {
             console.log(err);
             if(err.response.status === 404) {
               const swal = await Swal.fire({
                    icon: 'error',
                    text: '查無此課程'
                })
                console.log(swal);
                if (swal.isConfirmed || swal.isDismissed)  window.history.go(-1);
             }
         }
      },
}
