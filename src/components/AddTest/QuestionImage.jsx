import React from 'react'
import Delete from '../../assets/delete.svg'
function QuestionImage(props) {
  return (
    <>
      <section className='image-section'>

        <img src={props.src} alt='question illustration'></img>
        <img className='icon' alt='delete an image' src={Delete}></img>

      </section>
    
  

  </>
  )
}

export default QuestionImage