import React from 'react'

function Question(props) {
  const {currentIndex, currentQuestion, amountOfQuestions} = props
  return (
    <section className='question'>

    <span>Question {currentIndex + 1} / {amountOfQuestions}</span>

    <h2>{currentQuestion.title}</h2>

    <div className='question__image-container'>
      <img src={currentQuestion.image}></img>
    </div>


  </section>
  )
}

export default Question