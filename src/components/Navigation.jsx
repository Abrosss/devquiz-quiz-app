import React from 'react'
import { Link } from 'react-router-dom'
import Bulb from '../assets/bulb.svg'
function Navigation(props) {
    const { backTo, currentPage, linkTo } = props
    return (
        <nav>
            <div>
            <Link
                className='highlighted'
                to={linkTo}>{backTo}</Link>
            <span> / {currentPage}</span>
            </div>
            <div className='tips'>
                <img className='icon' src={Bulb}></img>
                
                <span>Tips</span>
            </div>
        </nav>
    )
}

export default Navigation