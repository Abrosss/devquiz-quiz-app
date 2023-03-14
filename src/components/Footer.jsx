import React from 'react'
import { Link } from 'react-router-dom'

function Header({position}) {
  return (
    <footer className={position}>
        <Link to="/categories">
            <img className='icon' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
          </Link>
    </footer>
  )
}

export default Header