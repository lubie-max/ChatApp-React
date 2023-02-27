import React from 'react'

const Messages = () => {
  return (
    <>
      <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <div className="chat-message">
         <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
               <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-500 text-gray-100   shadow-lg hover:scale-105 duration-500">Can be verified on any platform using docker</span></div>
            </div>
            <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1"/>
         </div>
      </div>
      {/* br here */}
      <div className="chat-message">
         <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
               <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gradient-to-r from-emerald-600 to-teal-600  text-white  shadow-lg hover:scale-105 duration-500 ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
            </div>
            <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-2"/>
         </div>
      </div>
      <div>hi there</div>
      
     
     
    
   
   </div>
    
    </>
  )
}

export default Messages