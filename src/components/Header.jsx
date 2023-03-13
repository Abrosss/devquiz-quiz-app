import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <Link to="/categories">DEVQUIZ</Link>
    </header>
  )
}

export default Header