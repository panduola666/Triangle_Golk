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
    },
    async update(params, id) {
        try {
            const user = await axios.get(`${VITE_BASEURL}/users/${localStorage.getItem('userId')}`);
            await axios.patch(`${VITE_BASEURL}/chatRooms/${id}`, params);
            const {totalCheckIn, avatars, checkInTimer} = user.data
            if(new Date(checkInTimer).toLocaleDateString() !== new Date(new Date()).toLocaleDateString()) {
                // 今天第一次簽到
                const count = totalCheckIn + 1
                if(count >= 90) {
                    !avatars.includes(8) && avatars.push(8)
                } else if(count >= 30) {
                    !avatars.includes(7) && avatars.push(7)
                } else if(count >= 7) {
                    !avatars.includes(6) && avatars.push(6)
                }
                if([90, 30, 7].includes(count)){
                    Swal.fire({
                        scrollbarPadding: false,
                        title: `恭喜您已簽到${count}天, 獲得新徽章`,
                        showConfirmButton: false,
                        timer: 2500,
                        allowOutsideClick: false
                    })
                }

                const data = {
                    totalCheckIn: count,
                    checkInTimer: new Date().getTime(),
                    avatars
                }
                await axios.patch(`${VITE_BASEURL}/users/${localStorage.getItem('userId')}`, data);
                
            }
            
            return await this.curCourse()
        } catch (err) {
            console.log(err);
        }
    }
}