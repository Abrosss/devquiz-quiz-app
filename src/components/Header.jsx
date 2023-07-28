import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { UserContext } from '../context/User'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
function Header({link, loggedIn, headerButton, page}) {
  const { setIsAdmin } = useContext(UserContext);
const navigate = useNavigate()
  function handleLogOut () {
    Cookies.remove('auth')
          setIsAdmin(false)
        navigate('/');
      

  }

  function isCreateTestPage (page) {
    if(!page) {
      return false
    }
    else if(page === "createTest") {
      return true
    }
  
    return false
  }
  return (
    <header className={isCreateTestPage(page) ? "header-new" : "header"}>
        <Link to={link ? link : "/"}>prepped<span className='highlighted'>.dev</span></Link>
        {isCreateTestPage(page) &&
        <button onClick={headerButton.onClick} className='button-2'>{headerButton.text}</button>
        }
        
        {loggedIn &&
            <button onClick={handleLogOut}>Log out</button>
        }
     </header>
  )
}

export default Header