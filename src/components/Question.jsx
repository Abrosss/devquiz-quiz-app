import React from 'react'

function Question(props) {
  const { questionNumber, currentQuestion, amountOfQuestions } = props
  return (
    <>

      <span>Question {questionNumber} / {amountOfQuestions}</span>

      <h2>{currentQuestion.title}</h2>
      {currentQuestion.image &&
        <div className='question__image-container'>
          <img src={currentQuestion.image}></img>
        </div>
      }



    </>
  )
}

export default Question