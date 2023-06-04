import React, { useEffect, useState, useContext } from 'react'
import axios from '../../api/auth';
import { useNavigate  } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cookies from 'js-cookie';
import { UserContext } from '../../context/User';
import './Login.css'
function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);
  const [user, setUser] = useState({username: "", password: ""})
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(userLogin)
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
          setUserLogin(user)
          Cookies.set('auth_token', user.token)
          setLoggedIn(true);
          navigate('/admin/tests');
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