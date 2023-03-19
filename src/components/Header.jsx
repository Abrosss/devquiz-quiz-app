import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <Link to="/">prepped<span className='highlighted'>.dev</span></Link>
    </header>
  )
}

export default Header