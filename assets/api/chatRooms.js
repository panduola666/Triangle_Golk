import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env;

export const ChatRooms = {
    async curCourse() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const courseId = urlParams.has('courseId') && urlParams.get('courseId') // 評論id => 編輯
            const res = await axios.get(`${VITE_BASEURL}/chatRooms?courseId=${courseId}&_expand=course`);
            
            return res.data;
        } catch (err) {
            console.log(err);
        }
    }
}