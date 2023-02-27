import React,{useState} from 'react'
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { useSelector } from 'react-redux';
import { selectUserId ,selectUserName, selectDisplayPic} from '../Services/authSlice';


const Search = () => {
    const [username , setUsername]= useState()
    const [user, setUser]= useState(null)
    const [err , setErr]= useState(false)
    const currentUserId = useSelector(selectUserId)
    const currentUserProfile = useSelector(selectDisplayPic)
    const currentUserName = useSelector(selectUserName)
    // console.log('userId',currentUserId)

    const handleSearch = async()=>{
        const q = query(collection(db, "users"),
         where("displayName", "==", username));

        try{

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
           // doc.data() is never undefined for query doc snapshots
            setUser(doc.data())
            // console.log(doc.id, " => ", doc.data());
            // return true
            });

          }catch(error){
              console.log(error)
              setErr(true)

          }
    }

    const handleKey = (e)=>{
      // setUser(e.target.value)
      e.key === "Enter" &&  handleSearch()
        // console.log(username)
          
    }

    const handleSelect = async()=>{
      const combinedId = user.uid > currentUserId ? user.uid + currentUserId : currentUserId + user.uid
      // const  combinedId =  currentUserId >user.id ? currentUserId + user.uid: user.uid + currentUserId 

      try{
      // check if users Chat exists if not create one
        const res = await getDoc(doc(db,'chats', combinedId))

        if(!res.exists()){
          // create chats  in chats collection
          await setDoc(doc(db, "chats", combinedId),{messages:[]})

          // create user's chat in userChats collection
          await updateDoc(doc(db,"userChat", currentUserId ),{
            [combinedId + ".userInfo"]:{
              uid: user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL
            },
            [combinedId + ".date"]: serverTimestamp()
          })

          await updateDoc(doc(db,"userChat", user.uid), {
            [combinedId + ".userInfo"]:{
              uid: currentUserId ,
              displayName: currentUserName ,
              photoURL: currentUserProfile
            },
            [combinedId + ".date"]: serverTimestamp()
          })

        

        }
      }
        catch(error){
          console.log(error)
        }

        setUser(null)
        setUsername('')
    }
    


  return (
    <>
    <div   className="pt-2 relative mb-2 mx-0  text-gray-600">
    <input
    value={username}
    onKeyDown={handleKey} 
    onChange={e => setUsername(e.target.value)}

     className=" border-emerald-800 text-gray-200  border-b-2  bg-gray-900 h-10 md:w-64 px-4  text-sm focus:outline-none"
      type="search" name="search" placeholder="Search User" />
   
  </div>

   

  <div className='flex justify-center'>
{
    err ?
       <i className="text-gray-400">
       User not found!
        </i> 
        : null
}

  {
    user ?   
<button  onClick={e => handleSelect()}
 className='my-1 px-auto md:w-64 rounded-t-xl  border-b border-gray-600  active:bg-gradient-to-r from-emerald-600 to-teal-600 hover:bg-gradient-to-r from-emerald-600 to-teal-600  focus:bg-gradient-to-r from-emerald-600 to-teal-600  transition duration-200 ease-in-out'>
 <div  className='flex justify-center gap-4 place-content-center  rounded-md m-0 p-1 items-center '>
             <img src={user.photoURL}
                     alt="" load='lazy' className="w-5 sm:w-16 h-5 sm:h-16 rounded-full" />
             <i className='text-xl font-mono capitalize text-gray-300'> {user.displayName}</i>
  </div>
</button>
 

:
null
}

  </div>

  </>
  )

}

export default Search