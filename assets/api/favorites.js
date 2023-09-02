import axios from "axios";
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env

export const Favorites = {
    async add(courseId) {
        try {
            const data = {
                userId: Number(localStorage.getItem('userId')),
                courseId: Number(courseId)
            }
            const res = await axios.post(`${VITE_BASEURL}/favorites`, data);
            Swal.fire({
                icon: 'success',
                title: '已加入關注清單',
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false
            })
        } catch (err) {
            console.log(err);
        }
    },
    async remove(id) {
        try {
            const res = await axios.delete(`${VITE_BASEURL}/favorites/${id}`);
            Swal.fire({
                icon: 'success',
                title: '已移出關注清單',
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false
            })
        } catch (err) {
            console.log(err);
        }
    }
}