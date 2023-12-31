import { User } from './users';
import { Comment } from './comment';
import { Course } from './course';
import { Passes } from './passes';
import { Favorites } from './favorites';
import { Avatars } from './avatars';
import { Notions } from './Notions';
import { KeyWords } from './key_words';
import { CoursesApplies } from './courses_applies';
import { UserMail } from './userMails';
import { ChatRooms } from './chatRooms'

function loading(apiData) {
    const loading = document.querySelector('.loading')
    if(apiData) {
        loading.style.opacity = 0
        setTimeout(() => loading.classList.add('d-none'), 1000)
        document.body.style.overflow = 'auto'
    }else{
        loading.classList.remove('d-none')
        loading.style.opacity = 1
        document.body.style.overflow = 'hidden'
    }
}

export { User, Comment, Course, Passes, Favorites, Avatars, loading, Notions, KeyWords, CoursesApplies, UserMail, ChatRooms }