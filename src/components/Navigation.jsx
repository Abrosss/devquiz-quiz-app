import React from 'react'
import { Link } from 'react-router-dom'
function Navigation(props) {
    const { backTo, currentPage, linkTo } = props
    return (
        <nav>
            <Link
                className='highlighted'
                to={linkTo}>{backTo}</Link>
            <span> / {currentPage}</span>
        </nav>
    )
}

export default Navigation