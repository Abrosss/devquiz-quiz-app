import React from 'react'
import { Link } from 'react-router-dom'
import Bulb from '../assets/bulb.svg'
import Timer from './Timer'
function Navigation(props) {
    const { linkToText, currentPage, linkTo, onTimeOut } = props
    console.log(currentPage)

    return (
        <nav>
            <div>
                {linkToText && linkTo &&
                <>
                <Link
                className='highlighted'
                to={linkTo}>{linkToText}</Link>
                <span> / </span>
               
                </>
                }
             <span>{currentPage}</span>
          
            </div>
           
            {/* <div className='tips'>
                <img className='icon' src={Bulb}></img>
                
                <span>Tips</span>
            </div> */}
        </nav>
    )
}

export default Navigation