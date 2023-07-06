import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { UserContext } from '../context/User'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
function Header({link, loggedIn}) {
  const { setIsAdmin } = useContext(UserContext);
const navigate = useNavigate()
  function handleLogOut () {
    Cookies.remove('auth')
          setIsAdmin(false)
        navigate('/');
      

  }
  return (
    <header>
        <Link to={link ? link : "/"}>prepped<span className='highlighted'>.dev</span></Link>
        {loggedIn &&
            <button onClick={handleLogOut}>Log out</button>
        }
     </header>
  )
}

export default Header