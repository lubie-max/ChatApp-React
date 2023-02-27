import { configureStore } from "@reduxjs/toolkit";
import auth from './Services/authSlice'
import chatUser from './Services/userChatSlice'

const store = configureStore({
    reducer:{
        auth: auth,
        chatUser :chatUser
    }
})

export default store