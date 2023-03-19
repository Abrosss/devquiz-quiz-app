import React, { useEffect, useState } from 'react'
import axios from '../../api/auth';
import { useNavigate  } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cookies from 'js-cookie';
import './Login.css'
function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({username: "", password: ""})
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(user)
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
          console.log(user)
          Cookies.set('auth_token', user.token)
          setLoggedIn(true);
          navigate('/');
        }


    } catch (err) {

        console.error(err);
    }


}
 console.log(loggedIn)
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
            </form>
        </section>
      <Footer position={"fixed"}/>
   </>
  )
}

export default Login