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
            const swal = await Swal.fire({
                scrollbarPadding: false,
                icon: 'success',
                title: '登入成功',
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false
            })
            if(swal.isConfirmed || swal.isDismissed) location.reload()
            return res.data;
        } catch (err) {
            console.log(err);
        }
     },
    // 註冊
    async register(data) {
        try {
            const res = await axios.post(`${VITE_BASEURL}/users`, data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
    // 登出 or token 失效(已登入超過一小時) => 清除 localStorage 裡面的用戶資料
    clearUserInfo() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    },
    // 請重新登入的 swal 彈窗
    async plsReLogin() {
        const swal = await Swal.fire({
            scrollbarPadding: false,
            title: '請重新登入'
        })
      if(swal.isDismissed || swal.isConfirmed) {
        this.clearUserInfo()
        location.href = 'index.html'
        // location.href = process.env.NODE_ENV === 'production'
        // ? '/Triangle_Golk/pages/index.html'
        // : '/pages/index.html'
      }
    },
    // 獲得所有用戶有關聯的資料
    async getUserInfo() {
        // 使用這個方法前 先在外面判斷 localStorage.getItem('token') 有沒有值
        // 沒有的話說明: 
        // 1. 用戶沒有登入, 要請他去登入
        // 2. 該頁面不需登入也能使用
        const userId = localStorage.getItem('userId')
        if(!userId) this.clearUserInfo()
        try {
            axios.defaults.headers.Authorization = localStorage.getItem('token')
            const res = await axios.get(`${VITE_BASEURL}/600/users/${userId}?_embed=favorites&_embed=notions&_embed=passes&_embed=comments&_expand=avatar`);
            return res.data;
        } catch (err) {
            console.log(err);
            if(err.response.status === 401 || err.response.statusText === 'Unauthorized') {
                // 登入過期, needBack 裡面的頁面要回到首頁
                const needBack = ['user.html', 'achievement.html', 'classroom.html', 'comment.html', 'user_courses.html', 'user_wishlist.html']
                if(needBack.some(pageName => location.pathname.match(pageName))) {
                    this.plsReLogin()
                }
                
                
            }
            this.clearUserInfo()
        }
    },
    // 修改用戶資訊
    async updateUser(data, useNewSwal = false) {
        try {
            const res = await axios.patch(`${VITE_BASEURL}/users/${localStorage.getItem('userId')}`, data);
            !useNewSwal && Swal.fire({
                scrollbarPadding: false,
                icon: 'success',
                title: '修改成功',
                showConfirmButton: false,
                timer: 1500
              })
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
} 