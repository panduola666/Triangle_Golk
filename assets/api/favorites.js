import axios from "axios";
import Swal from 'sweetalert2';
const { VITE_BASEURL } = import.meta.env
import { Course } from './index'


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
    },
    async getUserFavorites() {
        try {
            const courses = await Course.getAllCourses()
            const res = await axios.get(`${VITE_BASEURL}/favorites?_expand=course&userId=${localStorage.getItem('userId')}`)
            return res.data.map(data => {
                const course = courses.find(course => course.id === data.courseId)
                if(course) {
                    return {
                        ...data,
                        avgScore: course.avgScore,
                        totalComment: course.comments.length
                    }
                }
            }).filter(data => data)
        } catch (err) {
            console.log(err);
        }
    }
}