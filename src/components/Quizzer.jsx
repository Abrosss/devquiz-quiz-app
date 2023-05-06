import React from 'react'
import ProgressBar from './ProgressBar'
import QuestionScreen from './QuestionScreen';
import { useState } from 'react';
function Quizzer({ questions }) {
  const [progressTracking, setProgressTracking] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null })))
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    correctAnswerCount: 0
  });
  const { currentQuestionIndex, correctAnswerCount } = quizState
  function getCurrentQuestion() {
    return questions[currentQuestionIndex];
  }
  return (
    <>
      <ProgressBar
        progressTracking={progressTracking}
        currentQuestionIndex={currentQuestionIndex} />
      <section className='quiz'>
        <QuestionScreen
          currentQuestion={getCurrentQuestion()}
          questionNumber={currentQuestionIndex + 1}
          amountOfQuestions={questions.length}
        />
      </section>
    </>
  )
}

export default Quizzer