import axios from "axios";
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env

export const Passes = {
    // 添加到我的課程
    async addPasses(params) {
       try {
            const res = await axios.post(`${VITE_BASEURL}/passes`, params);
            Swal.fire({
                icon: 'success',
                title: '通過測試',
                showConfirmButton: false,
                timer: 2000
            })
            return res.data;
        } catch (err) {
            console.log(err);
        }
     },
    async getUserPasses() {
        try {
            const res = await axios.get(`${VITE_BASEURL}/passes?_expand=user&_expand=course&userId=${localStorage.getItem('userId')}`)
            return res.data
        } catch (err) {
            console.log(err);
        }
    }

} 