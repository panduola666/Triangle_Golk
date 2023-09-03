import { Passes, User } from '../api/index'

const originData = await Passes.getUserPasses()
const user = await User.getUserInfo()

// 把他們按照平台分類
const filterData = originData.reduce((obj, item) => {
    // 把此用戶該課程的評論加進去回傳
    const data = {
        ...item,
        comment: user.comments.find(comment => comment.courseId === item.courseId) || {}
    }
    obj[item.course.platform] ? obj[item.course.platform].push(data) : obj[item.course.platform] = [data]
    return obj
}, {})

// 簡易分頁
function pagination(page = 1, limit = 2 , curTag = '六角學院') {
    // filterData[curTag] 可以替換成只要進行分頁的 Array 資料
    const totalPages = Math.ceil(filterData[curTag].length / limit)
    const data = filterData[curTag]

    if(page < 1){
        console.log('已經在第一頁');
        // 回傳第一頁資料
        return {
            totalPages,
            currentPage: page,
            data: data.slice(0, limit)
        }
    }
    if(page > totalPages) {
        console.log('已經最後一頁');
        // 回傳最後一頁資料
        return {
            totalPages,
            currentPage: page,
            data: data.slice(data.length - limit)
        }
    }

    return {
        totalPages,
        currentPage: page,
        data: data.slice((page * limit) - limit, (page * limit))
    }
}
const test = pagination(1, 3)
console.log(test);
