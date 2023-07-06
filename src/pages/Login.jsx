import React, { useState, useContext } from 'react'
import axios from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading'
import GoogleAuthButton from '../components/GoogleAuthButton'
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'
import { UserContext } from '../context/User';
import { GoogleOAuthProvider } from '@react-oauth/google';


function Login() {
  const navigate = useNavigate();
  const { setIsAdmin } = useContext(UserContext)
  const [user, setUser] = useState({ username: "", password: "" })
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
        password: user.password
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
    handleGoogle(jwtDecode(response.credential))
  };
  const onFailure = (error) => {
    console.error('Failed to log in with Google!');
    console.error(error);

  };
  const handleGoogle = (user) => {
    setIsLoading(true)
    axios.post("/google-signup", {
      email: user.email,
      username: user.email.slice(0, user.email.indexOf("@")),
    }).then(res => {
      if (res.status === 200) {

        if (res.data) {
          const userData = jwtDecode(res.data.token);

          if (userData.isAdmin) {
            Cookies.set('auth', res.data.token);
            setIsAdmin(true)
            navigate('/admin/tests')
          }
          else {
          
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
      <Header />
      <section className='container-content'>
        {isLoading ?
          <Loading />
          :
          <>
            <div className='centered'>
              <h1>SIGN IN</h1>
              <p>To create tests</p>
            </div>
            <form>
              <input onChange={(e) => handleUserChange(e)} placeholder='LOGIN' type="text" name='username'></input>
              <input onChange={(e) => handleUserChange(e)} placeholder='PASSWORD' type="text" name='password'></input>
              <button onClick={addUser}>LOGIN</button>
              <GoogleOAuthProvider
                clientId= {import.meta.env.VITE_CLIENT_ID}
              >
                <div className='flex'>
                  {/* <button onClick={() => handleGoogle({email:'demo@gmail.com'})} className='button-demo'>Demo</button> */}
                  <GoogleAuthButton onSuccess={onSuccess} onFailure={onFailure} />
                </div>
              </GoogleOAuthProvider>
            </form>
          </>
        }

      </section>
      <Footer position={"fixed"} />
    </>
  )
}

export default Login