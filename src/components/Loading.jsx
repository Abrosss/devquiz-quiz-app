import React from 'react'
import LoadingIcon from '../assets/pulse.gif'
function Loading() {
  return (
    <img data-testid="loading" className='icon' src={LoadingIcon} alt="loading"  ></img>
  )
}

export default Loading