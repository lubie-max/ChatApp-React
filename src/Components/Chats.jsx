import React, { useEffect } from 'react'
import { useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';
import { selectUserId } from '../Services/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatId, selectChatUser, setChatUser } from '../Services/userChatSlice';

const Chats = () => {
    const [chats, setChats] = useState()
    const activeUserId = useSelector(selectUserId)
    const dispatch = useDispatch()
    const user = useSelector(selectChatUser)
    const chatId = useSelector(selectChatId)
    console.log('select User', user)
    console.log('ChatId', chatId)
    
    

    useEffect(() => {
        const getUserChats =  () => {
            const unsub =  onSnapshot(doc(db, "userChat", activeUserId), (doc) => {
                console.log("Current data: ", doc.data());
                setChats(doc.data())
                console.log(Object.entries(chats))

            });
            return () => {
                unsub()
            }

        }
        activeUserId && getUserChats()

    }, [activeUserId])

    const handleSelect =(userInfo) =>{
        console.log('hi there!', userInfo)
        dispatch(setChatUser({
            user: userInfo,
            currentUserId: activeUserId

        }))


    }

    return (

        <>
            {/* <div> */}
{chats?<>

    {Object.entries(chats)?.map((chat) => (
                 <button key={chat[0]} 
                 onClick={()=> handleSelect(chat[1].userInfo)}
                 className='my-1 mx-1   border-gray-600 border  active:bg-gradient-to-r from-emerald-600 to-teal-600 hover:bg-gradient-to-r from-emerald-600 to-teal-600  focus:bg-gradient-to-r from-emerald-600 to-teal-600 rounded-md transition duration-200 ease-in-out'>
                 <div className='flex justify-start gap-8 mx-2 place-content-center  rounded-md m-0 p-1 items-center '>
                     <img src={chat[1].userInfo.photoURL}
                         alt="" load='lazy' className="w-5 sm:w-16 h-5 sm:h-16 rounded-full" />
                     <div>
                         <i className='text-xl font-mono capitalize text-gray-300'> {chat[1].userInfo.displayName } </i>
                         <p className="text-gray-400"> last message</p>
                     </div>
                 </div>
             </button>
            )  )

  } 

</>:null}
           

            {/* </div> */}


        </>
    )
}

export default Chats
                