import React from 'react'
import { ProgressBar } from './ProgressBar'
import Question from './Question';
import Answers from './Answers';
import Result from './Result'
import { useState, useEffect } from 'react';
import Explanation from './Explanation';
import Button from './Button'


function filterAnswers(selectedAnswer, allAnswers) {
  if (selectedAnswer.correct) {
    return [selectedAnswer];
  }
  else {
    return allAnswers.filter(answer => answer.title === selectedAnswer.title || answer.correct);
  }
}

function Quiz({ questions }) {

  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    quizIsFinished: false
  });
  const { currentQuestionIndex, correctAnswerCount, quizIsFinished } = quizState
  const [progressTracking, setProgressTracking] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null })))
  const [visibleAnswers, setVisibleAnswers] = useState(getCurrentQuestion().answers)
  const [userResults, setUserResults] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { question: null, selectedAnswer: null })))

  useEffect(() => {
    setVisibleAnswers(getCurrentQuestion().answers)

  }, [currentQuestionIndex])

  function getCurrentQuestion() {
    return questions[currentQuestionIndex];
  }

  function getSelectedAnswer() {
    return userResults[currentQuestionIndex].selectedAnswer
  }

  function saveUserResults(question, selectedAnswer) {
    setUserResults(prevResults => {
      const newResults = [...prevResults];
      newResults[currentQuestionIndex] = { ...newResults[currentQuestionIndex], question: question, selectedAnswer: selectedAnswer };
      return newResults;
    });
  }

  function updateProgressBar(answer, index) {
    if (!answer) {
      return;
    }
    const updatedArray = [...progressTracking];
    updatedArray[index].isCorrect = answer.correct;
    setProgressTracking(updatedArray);

  }

  function checkAnswer(selectedAnswer) {

    //CHECK IF an answer was already selected, to avoid click dublication

    const answerAlreadySelected = getSelectedAnswer() !== null;
    if (answerAlreadySelected) return

    if (selectedAnswer.correct) updateCounter() //UPDATE the quiz counter

    saveUserResults(getCurrentQuestion(), selectedAnswer)  //Save user progress
    updateProgressBar(selectedAnswer, currentQuestionIndex) //update progress bars
    setVisibleAnswers(filterAnswers(selectedAnswer, getCurrentQuestion().answers)) //filter answers to display the selected and the correct answers only
  }

  function nextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizState(prevState => ({
        ...prevState,
        quizIsFinished: true
      }));
    }
    else {
      setQuizState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1
      }));
    }
  }
  function updateCounter() {
    setQuizState(prevState => ({
      ...prevState,
      correctAnswerCount: prevState.correctAnswerCount + 1
    }));
  }
  function restartQuiz() {
    setQuizState(prevState => ({
      ...prevState,
      quizIsFinished: false,
      currentQuestionIndex: 0,
      correctAnswerCount: 0,
    }));
    setUserResults(Array.from({ length: questions.length }, () =>
      Object.assign({},
        { question: null, selectedAnswer: null })))
    setProgressTracking(Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null })))
    setVisibleAnswers(getCurrentQuestion().answers)
  }


  return (

    <>
      {quizIsFinished ?
        <Result
          correctAnswerCount={correctAnswerCount}
          amountOfQuestions={questions.length}
          handleRestartQuiz={restartQuiz}
        />
        :
        <>
          <ProgressBar
            questions={progressTracking}
            currentQuestionIndex={currentQuestionIndex} />

          <section className='quiz'>
            <section className='question-section'>
              <Question
                currentQuestion={getCurrentQuestion()}
                questionNumber={currentQuestionIndex + 1}
                amountOfQuestions={questions.length}
              />
            </section>
            <section className='answers-section'>

              <Answers
                answers={visibleAnswers}
                checkAnswer={checkAnswer}
                selectedAnswer={getSelectedAnswer()}
              />

              {getSelectedAnswer() !== null && getCurrentQuestion().explanation &&
                <Explanation
                  explanation={getCurrentQuestion().explanation} />
              }

              {getSelectedAnswer() !== null &&
                <Button
                  func={nextQuestion}
                  name={currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}
                />
              }

            </section>
          </section>

        </>

      }

    </>
  )
}

export { filterAnswers, Quiz }