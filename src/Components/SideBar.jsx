import React, { useState } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../Firebase'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUserLogoutState ,selectDisplayPic, selectUserName} from '../Services/authSlice';
import Search from './Search';
import Chats from './Chats';

const SideBar = () => {
const [err, setErr] = useState(false)
const navigate = useNavigate()
const dispatch = useDispatch()
const picture = useSelector(selectDisplayPic)
const name = useSelector(selectUserName)
console.log('picture', picture)

const handelSignOut =(e)=>{
signOut(auth).then(() => {
dispatch(setUserLogoutState())
}).catch((error) => {
setErr(error)
});

}


return (
<>
        <div  className='flex flex-col border-r-2 border-gray-600   bg-gradient-to-r from-gray-800 to-zinc-900 md:w-72'  >

                {/* LOGO */}
                {/* <div className=' rounded-b-md p-3 text-center '>
                        <i  className='bg-gradient-to-r from-emerald-600 to-teal-300 bg-clip-text text-transparent text-3xl font-extrabold '>HIthere!</i>
                </div> */}

                

                <div className='flex justify-evenly items-center  my-1   p-1 rounded '>
                        <div className='flex1 gap-4 mr-3'>
                                <img src={picture} style={{width:'3rem',height:'3rem'}} alt="" load='lazy'  className=" rounded-full" />
                        </div>
                        <i className='text-gray-200 uppercase text-xs mr-2'>{name}</i>
                        <button onClick={(e)=>handelSignOut(e)}  className='text-gray-100 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-md px-3 py-1  active:bg-gray-400 '>
                                LOGOUT
                        </button>
                </div>

             
        <div className='flex justify-center items-center flex-col mx-0  '>
               <Search />
        </div>

                {/* contacts/ chats */}
                {/* <div className='flex justify-center mx-0 '> */}
                       <Chats/>

                {/* </div> */}



                {/*
                <hr /> */}

                {/* Footer */}

                <div className=' p-3 flex justify-center absolute left-auto bottom-0'>
                        <i className='bg-gradient-to-r from-emerald-600 to-teal-300 bg-clip-text text-transparent text-md font-bold '>HIthere!</i>

                </div>
        </div>
</>
)}


export default SideBar ;