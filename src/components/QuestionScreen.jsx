import React from 'react'

function QuestionScreen(props) {
  const { questionNumber, currentQuestion, amountOfQuestions } = props
  return (
    <section className='question'>

      <span>Question {questionNumber} / {amountOfQuestions}</span>

      <h2>{currentQuestion.title}</h2>
      {currentQuestion.image &&
        <div className='question__image-container'>
          <img src={currentQuestion.image}></img>
        </div>
      }



    </section>
  )
}

export default QuestionScreen