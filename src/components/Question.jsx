import React from 'react'

function Question(props) {
  const { questionNumber, currentQuestion, amountOfQuestions } = props
  return (
    <>

      <span>Question {questionNumber} / {amountOfQuestions}</span>

      <h2 className='question-section__title' data-testid='question-title'>{currentQuestion.title}</h2>
      {currentQuestion.image &&
        <div className='question-section__image'>
          <img src={currentQuestion.image}></img>
        </div>
      }



    </>
  )
}

export default Question