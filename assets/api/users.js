import axios from "axios";
const { VITE_BASEURL } = import.meta.env
import Swal from 'sweetalert2';


//  user 相關 api
export const User = {
    // 登入
    async login(data) {
       try {
            const res = await axios.post(`${VITE_BASEURL}/login`, data);
            // 把 token 存在 localStorage
            localStorage.setItem('token', `Bearer ${res.data.accessToken}`) 
            localStorage.setItem('userId', res.data.user.id)
            Swal.fire({
                icon: 'success',
                title: '登入成功'
            })
            return res.data;
        } catch (err) {
            console.log('登入失敗');
            console.log(err);
        }
     },
    // 註冊
    async register(data) {
        try {
            const res = await axios.post(`${VITE_BASEURL}/users`, data);
            console.log('註冊成功');
            return res.data;
        } catch (err) {
            console.log('註冊失敗');
        }
    },
    // 登出 or token 失效(已登入超過一小時) => 清除 localStorage 裡面的用戶資料
    clearUserInfo() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    },
    // nav 用戶系統公告
    async getNotions(id) {
        const token = localStorage.getItem('token')
        console.log(token);
        axios.defaults.headers.common['Authorization'] = token

        return axios.get(`${VITE_BASEURL}/600/users/${id}?_embed=notions`)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch(err => {
            console.log(err);
        })
    }
} 