import React, { useEffect, useState, useContext } from 'react'
import axios from '../../api/auth';
import { useNavigate  } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GoogleAuthButton from '../../components/GoogleAuthButton'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'
import { UserContext } from '../../context/User';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './Login.css'
function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);
  const [user, setUser] = useState({username: "", password: ""})
  const { isAdmin, setIsAdmin } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  async function addUser(e) {
    e.preventDefault()
    try {
        const response = await axios.post('/signIn', {
            username: user.username,
            password:user.password
        });
        if (response.status === 200) {
          const user = response.data
     
          Cookies.set('auth_token', user.token)
          setLoggedIn(true);
          navigate('/admin/tests');
        }


    } catch (err) {

        console.error(err);
    }


}
const onSuccess = (response) => {

  console.log(response)
     // The response object is passed as an argument to the onSuccess function.
     // You can access it using the "response" argument.
  
     handleGoogle(jwtDecode(response.credential))
    
     // You can use the response object to get the user's profile information,
     // such as their name and email address.
   };
   const onFailure = (error) => {
     console.error('Failed to log in with Google!');
     console.error(error);
     // You can use the error object to handle the error and display an appropriate
     // message to the user.
   };
const handleGoogle = (user) => {
  setIsLoading(true)
  axios.post("/google-signup", {
    email: user.email,
    username: user.email.slice(0, user.email.indexOf("@")),
  }).then(res => {
    if (res.status === 200) {
  
      if (res.data) {
        const userData  = jwtDecode(res.data.token);

        if (userData.isAdmin) {

         setIsAdmin(true);
        navigate('/admin/tests') }
        else {
          setIsAdmin(false);
          // Redirect to the desired path using react-router or any other routing mechanism
          navigate('/');
        }
      }
  
      setIsLoading(false)
      
    }

  })
    .catch(err => {
      console.log(err)
      setIsLoading(true)
    })
}

  return (
   <>
      <Header/>
        <section className='container-content'>
            <div className='centered'>
            <h1>SIGN IN</h1>
            <p>To create tests</p>
            </div>
            <form>
                <input onChange={(e) => handleUserChange(e)} placeholder='LOGIN' type="text" name='username'></input>
                <input onChange={(e) => handleUserChange(e)} placeholder='PASSWORD' type="text" name='password'></input>
                <button onClick={addUser}>LOGIN</button>
                <GoogleOAuthProvider
          clientId="3617139942-q2tpaatkgh80vuenj239u3i5vgm5v1ad.apps.googleusercontent.com"

        >
          <div className='flex'>
          {/* <button onClick={() => handleGoogle({email:'demo@gmail.com'})} className='button-demo'>Demo</button> */}
          <GoogleAuthButton onSuccess={onSuccess} onFailure={onFailure} />
          </div>
        </GoogleOAuthProvider> 
            </form>
        </section>
      <Footer position={"fixed"}/>
   </>
  )
}

export default Login