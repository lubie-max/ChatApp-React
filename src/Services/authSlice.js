import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    userName:null,
    email:null, 
    isAuth : false,
    displayPictureUrl: null,
    userId : null
    
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setActiveUser: (state,action)=>{
            state.userName = action.payload.userName
            state.email = action.payload.email
            state.isAuth = true
            state.userId = action.payload.userId
            state.displayPictureUrl= action.payload.displayPictureUrl
        },
        setUserLogoutState:  state =>{
            state.userName=null
            state.email=null
            state.isAuth = false
            state.displayPictureUrl =null

        }
    }

})


export const {setActiveUser, setUserLogoutState} = userSlice.actions
export const selectUserName = state => state.auth.userName
export const selectEmail = state => state.auth.email
export const selectUserId = state => state.auth.userId
export const selectDisplayPic = state => state.auth.displayPictureUrl

export default  userSlice.reducer