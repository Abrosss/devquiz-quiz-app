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

function Quizzy({ questions, isAdmin }) {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    quizIsFinished: false
  });
  const { currentQuestionIndex, correctAnswerCount, quizIsFinished } = quizState
  const [progressTracking, setProgressTracking] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null })))
  const [visibleAnswers, setVisibleAnswers] = useState(currentQuestion().options)
  const [userResults, setUserResults] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { question: null, selectedAnswer: null })))

  useEffect(() => {
    setVisibleAnswers(currentQuestion().options)

  }, [currentQuestionIndex])

  function currentQuestion() {
    return questions[currentQuestionIndex];
  }

  function selectedAnswer() {
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

  function checkAnswer(answer) {

    //CHECK IF an answer was already selected, to avoid click dublication

    const answerAlreadySelected = selectedAnswer() !== null;
    if (answerAlreadySelected) return

    if (answer.correct) updateCounter() //UPDATE the quiz counter

    saveUserResults(currentQuestion(), answer)  //Save user progress
    updateProgressBar(answer, currentQuestionIndex) //update progress bars
    setVisibleAnswers(filterAnswers(answer, currentQuestion().options)) //filter answers to display the selected and the correct answers only
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
    setVisibleAnswers(currentQuestion().options)
  }

function handleProgressCellClick(index) {
  setQuizState(prevState => ({
    ...prevState,
    currentQuestionIndex: index
  }));
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
            currentQuestionIndex={currentQuestionIndex} 
            func={handleProgressCellClick}
            isAdmin={isAdmin}
            />

          <section className={currentQuestion().image ? "quiz" : "quiz column center"} data-testid="quiz">
            <section className='question-section'>
              <Question
                currentQuestion={currentQuestion()}
                questionNumber={currentQuestionIndex + 1}
                amountOfQuestions={questions.length}
              />
            </section>
            <section className='answers-section'>

              <Answers
                answers={visibleAnswers}
                checkAnswer={checkAnswer}
                selectedAnswer={selectedAnswer()}
              />

              {selectedAnswer() !== null && currentQuestion().explanation &&
                <Explanation
                  explanation={currentQuestion().explanation} />
              }

              {selectedAnswer() !== null &&
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

export { filterAnswers, Quizzy }