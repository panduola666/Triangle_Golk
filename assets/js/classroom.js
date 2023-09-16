import { ChatRooms } from "../api";
// 聊天窗配置
const botController = (function () {
})();
const uiController = (function () {
})();
const controller = (function (botCntr, uiCntr) {
    var $chatCircle,
        $chatBox,
        $chatBoxClose,
        $chatBoxWelcome,
        $chatWraper,
        $submitBtn,
        $chatInput,
        $msg;

    /*toggle*/
    function hideCircle(evt) {
        evt.preventDefault();
        $chatCircle.hide('scale');
        $chatBox.show('scale');
        $chatBoxWelcome.show('scale');
    }

    function chatBoxCl(evt) {
        evt.preventDefault();
        $chatCircle.show('scale');
        $chatBox.hide('scale');
        $chatBoxWelcome.hide('scale');
        $chatWraper.hide('scale');
    }

    function chatOpenMessage(evt) {
        evt.preventDefault();
        $chatBoxWelcome.hide();
        $chatWraper.show();
    }

 
    function init() {
        $chatCircle = $("#chat-circle");
        $chatBox = $(".chat-box");
        $chatBoxClose = $(".chat-box-toggle");
        $chatBoxWelcome = $(".chat-box-welcome__header");
        $chatWraper = $("#chat-box__wraper");
        $chatInput = $("#chat-input__text");
        $submitBtn = $("#chat-submit");

        //1. call toggle 
        $chatCircle.on("click", hideCircle);
        $chatBoxClose.on("click", chatBoxCl);
        $chatInput.on("click", chatOpenMessage);

        //2. call wait message from CRM-human

        $submitBtn.on("click");
        $chatInput.on("keypress");


        //6. get message from bot controller-back end
        //7. display bot message to ui controller
    }

    return {
        init: init
    };

})(botController, uiController);
$(document).ready(controller.init);

let chatRoomsData
let curRoom
// 畫面配置
async function init() {
    chatRoomsData = await ChatRooms.curCourse()

    // 渲染課程資訊
    const { platform, title, id } = chatRoomsData[0].course
    $('.page-platform').html(platform)
    $('.page-title').html(title)
    $('.page-back').attr('href', `coursepages.html?id=${id}&sort=timer`)
    $('#dropdown-menu-link').html(`教室：${chatRoomsData[0].name}`)

    // 渲染當前教室數量
    $('.room-list').html(chatRoomsData.map(item => `
    <li data-total="${item.total}" class="dropdown-item">教室：${item.name}</li>
    `).join(''))
    renderClassTable(chatRoomsData[0].total, chatRoomsData)
}
init()
function renderClassTable(total, chatRoomsData) {
    curRoom = $('#dropdown-menu-link').text().split('：')[1]
    const { onlineUsers = [] } = chatRoomsData.find(room => room.name === curRoom)
    const tableNum = Math.round(total / 3)
    let str = '';
    for (let i = 1; i <= tableNum; i++) {
        str += `<li class="triangle col-lg-3 col-md-5 col-12 d-flex flex-column text-center text-center">
            <div class="col-auto triangle-container d-flex justify-content-center align-items-center col-auto">
                <span data-table="${i}-1" class="triangle-two col-auto ${onlineUsers.find(user => user.site === `${i}-1`) ? 'active' : ''}"></span>
                <span data-table="${i}-2" class="triangle-three col-auto ${onlineUsers.find(user => user.site === `${i}-2`) ? 'active' : ''}"></span>
                <span data-table="${i}-3" class="triangle-four col-auto ${onlineUsers.find(user => user.site === `${i}-3`) ? 'active' : ''}"></span>
            </div>
        </li>`
    }
    $('.page-table').html(str)
}
// 點籍桌子坐下
$('.page-table').click(async(e) => {
    const { table } = e.target.dataset
    if(!table || e.target.classList.contains('active')) return
    const { onlineUsers = [], total, id } = chatRoomsData.find(room => room.name === curRoom)
    const userId = Number(localStorage.getItem('userId'))
    const userSiteObj = onlineUsers.find(user => user.userId === userId)
    if(userSiteObj) {
        // 已在教室有座位
        userSiteObj.site = table
    }else{
        onlineUsers.push({
            site: table,
            userId
        })
    }
    renderClassTable(total, chatRoomsData)
    await ChatRooms.update({onlineUsers}, id)
})

// 切換教室
$('.room-list').click((e) => {
    if(!e.target.dataset.total) return
    $('#dropdown-menu-link').html(e.target.textContent)
    renderClassTable(e.target.dataset.total, chatRoomsData)
})

// 離開教室
$('.level-class').click(async(e) => {
    e.preventDefault()
    const { onlineUsers = [], id, total } = chatRoomsData.find(room => room.name === curRoom)
    const list = onlineUsers.filter(user => user.userId !== Number(localStorage.getItem('userId')))
    renderClassTable(total, await ChatRooms.update({onlineUsers: list}, id))
    location.href = $('.page-back').attr('href')
})