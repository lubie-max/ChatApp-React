import {createSlice} from '@reduxjs/toolkit'



const initialState = {
    chatId : null ,
    user : {},
    currentUserId: null
}

const userChatSlice = createSlice({
    name:'userChat',
    initialState,
    reducers:{
        
        setChatUser: (state, action)=>{
            state.currentUserId = action.payload.currentUserId
            state.user =  action.payload.user 
            state.chatId = state.user.uid > state.currentUserId ? state.user.uid + state.currentUserId : state.currentUserId + state.user.uid
      
        }
    }
})

export const {setChatUser} =userChatSlice.actions
export const selectChatUser = state => state.chatUser.user 
export const selectChatId = state => state.chatUser.chatId
export default userChatSlice.reducer
