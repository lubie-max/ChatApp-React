import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectEmail, selectUserName, setActiveUser } from '../Services/authSlice'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from '../Firebase'



const Login = () => {

  const [err, setErr] = useState(false)
  const dispatch = useDispatch()
  // const userName = useSelector(selectUserName)
  // const email = useSelector(selectEmail)
  const navigate = useNavigate()

  // console.log(userName, email)

  const submitForm = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    console.log( password , email)

    try {

      const res = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch(setActiveUser({
          userName: user.displayName,
          email: user.email,
          displayPictureUrl: user.photoURL,
          userId :user.uid

        }))
        navigate("/")
      })
      // console.log('res',res)

    } catch (error) {
      setErr(true)
      console.log(error)
    }
  }

  return (
    <>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-100 bg-gray-800">
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
                      <div> Unauthorized User.</div>

                    </div>
                  </div>
                </div>
              </> : null}
              <form onSubmit={(e)=>submitForm(e)}>

                {/* <!-- Email input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name='email'
                    placeholder="Email address"
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name='password'
                    placeholder="Password"
                  />
                </div>

                {/* <div className="flex justify-between items-center mb-6">

                  <div className="form-group form-check">
                
                  </div>
                  <a href="#!"  className="text-emerald-600">Forgot password?</a>
                </div> */}

                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:bg-emerald-500 hover:scale-105  text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg focus:bg-emerald-500 focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-300 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account? &nbsp;
                    <Link to={'/signup'}
                      className="text-emerald-600 hover:text-cyan-700 focus:text-gray-400 transition duration-200 ease-in-out"
                    >
                      Register
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

export default Login;