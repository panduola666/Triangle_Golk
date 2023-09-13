import axios from "axios";
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env


export const KeyWords = {
   async get(){
    try {
        const res = await axios.get(`${VITE_BASEURL}/keyWords`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
    }
}