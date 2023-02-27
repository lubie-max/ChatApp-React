import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import MainGrid from './Components/MainGrid';
import { Routes, Route, Navigate}  from 'react-router-dom'
import Home from './Components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser, setUserLogoutState } from './Services/authSlice';
import { auth } from './Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector(state=>state.auth.isAuth)
  console.log(isAuth)

  // const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log('user/currentUser',currentUser)
  
  useEffect( ()=>{
    onAuthStateChanged(auth, async (user) => {
     if (user) {
       dispatch(setActiveUser({
         userName: user.displayName,
         email: user.email,
         displayPictureUrl:  user.photoURL,
         userId :user.uid,
         isAuth: true
       })
      )

     console.log('currentUser',user)

     } else {
      signOut(auth).then(() => {
        dispatch(setUserLogoutState())
        }).catch((error) => {
        // setErr(error)
        console.log(error)
        });
     }
   })
  
  },[])


  // having some unwanted behavior while using protected root
  const ProtectedRoot = ({children, curUser})=>{
      if(!curUser){
        return <Navigate to="/login" replace />
      }
      return children
  }

  return (
  <>
 
  <Routes>
    <Route path='/login' element={<Login/>} />

// it's working fine rather than using protected root
    <Route index path='/' element={currentUser ?
      <Home/>: <Login/>
      } />

// not making sence , using protected route in this case
{/* <Route index path='/' element={
    <ProtectedRoot curUser={currentUser}>
      <Home/>
     </ProtectedRoot>
      } /> */}
   
   
    <Route path='/register' element={<Register/>} />

  </Routes>
  </>
  );
}

export default App;
