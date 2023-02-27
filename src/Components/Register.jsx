import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, getAuth } from "firebase/auth";
import { auth, db, storage } from '../Firebase'
import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveUser, selectEmail, selectUserName } from '../Services/authSlice';

const Register = () => {

  const [err, setErr] = useState(false)
  const dispatch = useDispatch()
  
  const navigate = useNavigate()

  

  const submitForm = async (e) => {
    e.preventDefault()
    const displayName = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      // .then((userAuth)=> onAuthStateChanged(auth, (userAuth)))
   
      console.log(res)

      // uploading profile file to firebase storage.
      const storageRef =  ref(storage, `${res.user.email}+${res.user.uid}`);
      const uploadTask =  uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log(error)
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName ,
              photoURL: downloadURL
            });
          
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });

            await setDoc(doc(db, "userChat", res.user.uid), {})

            dispatch(setActiveUser({
                    userName: res.user.displayName,
                    email: res.user.email,
                    displayPictureUrl:  downloadURL ,
                    userId :res.user.uid
                  })
      
                 )
              
           
          

            navigate("/")
            console.log(res)


           }
          )

        }
        )
    } 
    
    catch (error) {
      setErr(true)
      console.log(error)
    };


    
   

  }

  



  return (
    <>
      <section className="lg:h-screen  text-gray-100 bg-gray-800">


        <div className="px-6 h-full">
          <div
            className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
          >
            <div
              className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-8/12 md:w-4/6 mb-12 md:mb-0"
            >


              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
                loading='lazy'
              />

            </div>

            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

              {err ? <>
                <div className='flex justify-center m-3'>
                  <div className="flex md:w-auto shadow-lg rounded-lg">
                    <div className="bg-emerald-600 py-1 px-6 rounded-l-lg flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" viewBox="0 0 16 16" width="20" height="20"><path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"></path></svg>
                    </div>
                    <div className="px-4 py-6 bg-gray-600 rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
                      <div>Maybe, email is already in use or password is short. (min-length is 6)</div>

                    </div>
                  </div>
                </div>
              </> : null}

              <form onSubmit={(e) => submitForm(e)}>


                {/* Display Name Input */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="disply-name"
                    name='name'
                    placeholder="Display name"
                  />
                </div>

                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="email"
                    required

                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="email"
                    name='email'
                    placeholder="Email address"
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="password"
                    name='password'
                    placeholder="Password"
                    required
                  />
                </div>

                {/* Profile Pic input */}
                <div className="mb-6 hover:scale-105 duration-300">
                  <label className=" flex flex-col items-center px-4 py-6 bg-gray-700 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                    <svg className="w-8 h-8 hover:text-cyan-600 animate-bounce  " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Profile Picture</span>
                    <input type='file' className="hidden" />
                  </label>
                </div>



                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 focus:bg-cyan-600  bg-gradient-to-r from-emerald-600 to-teal-600  text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:scale-105 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-1000 ease-in-out"
                  >
                    Register
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-3">
                    Already, have an account? &nbsp;
                    <Link to={'/'}
                      className="text-emerald-600 hover:text-cyan-700 focus:text-gray-400 transition duration-200 ease-in-out"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register 