import axios from "axios";
const { VITE_BASEURL } = import.meta.env
import Swal from 'sweetalert2';

export const Notions = {
    async get(){
        try {
            const res = await axios.get(`${VITE_BASEURL}/notions?userId=${localStorage.getItem('userId')}`);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    async delete(id) {
        try {
            const res = await axios.delete(`${VITE_BASEURL}/notions/${id}`);
        } catch (err) {
            console.log(err);
        }
    }
}