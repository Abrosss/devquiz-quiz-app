import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function Header({link, loggedIn}) {
const navigate = useNavigate()
  function handleLogOut () {

      const authToken = Cookies.get('auth_token');
    
      if (authToken) {
        console.log(authToken)
        Cookies.remove('auth_token');
        navigate('/tests');
      } 

  }
  return (
    <header>
        <Link to={link}>prepped<span className='highlighted'>.dev</span></Link>
        {loggedIn &&
            <button onClick={handleLogOut}>Log out</button>
        }
     </header>
  )
}

export default Header