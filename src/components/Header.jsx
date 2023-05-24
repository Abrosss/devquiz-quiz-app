import React from 'react'
import { Link } from 'react-router-dom'

function Header({link}) {
  return (
    <header>
        <Link to={link}>prepped<span className='highlighted'>.dev</span></Link>
    </header>
  )
}

export default Header