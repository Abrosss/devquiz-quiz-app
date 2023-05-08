import React from 'react'
import { ProgressBar } from './ProgressBar'
import QuestionScreen from './QuestionScreen';
import Answer from './Answer';
import Result from './Result'
import { useState, useEffect } from 'react';

function wrapString(string) {
  return string.split(';')
}

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
  const [userResults, setUserResults] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { question: null, correctAnswer: null, selectedAnswer: null })))

  useEffect(() => {
    setVisibleAnswers(getCurrentQuestion().answers)

  }, [currentQuestionIndex])

  function getCurrentQuestion() {
    return questions[currentQuestionIndex];
  }

  function getSelectedAnswer() {
    return userResults[currentQuestionIndex].selectedAnswer
  }

  function saveUserResults(question, correctAnswer, selectedAnswer) {
    setUserResults(prevResults => {
      const newResults = [...prevResults];
      newResults[currentQuestionIndex] = { ...newResults[currentQuestionIndex], question: question, correctAnswer: correctAnswer, selectedAnswer: selectedAnswer };
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
    const answerSelected = getSelectedAnswer() !== null; //avoid click dublication
    if (answerSelected) return

    let correctAnswer = getCurrentQuestion().answers.find(answer => answer.correct)
    saveUserResults(getCurrentQuestion(), correctAnswer, answer)

    updateProgressBar(answer, currentQuestionIndex)

    const answersToDisplay = filterAnswers(answer, getCurrentQuestion().answers)
    setVisibleAnswers(answersToDisplay)

    if (answer.correct) {
      setQuizState(prevState => ({
        ...prevState,
        correctAnswerCount: prevState.correctAnswerCount + 1
      }));

    }


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

  function restartQuiz() {
    setQuizState(prevState => ({
      ...prevState,
      quizIsFinished: false,
      currentQuestionIndex: 0,
      correctAnswerCount: 0,
    }));
    setUserResults(Array.from({ length: questions.length }, () =>
      Object.assign({},
        { question: null, correctAnswer: null, selectedAnswer: null })))
    setProgressTracking(Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null })))

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
            progressTracking={progressTracking}
            currentQuestionIndex={currentQuestionIndex} />

          <section className='quiz'>
            <QuestionScreen
              currentQuestion={getCurrentQuestion()}
              questionNumber={currentQuestionIndex + 1}
              amountOfQuestions={questions.length}
            />

            <section className='answers'>

              <Answer
                answers={visibleAnswers}
                checkAnswer={checkAnswer}
                selectedAnswer={getSelectedAnswer()}
              />

              {getSelectedAnswer() && getCurrentQuestion().explanation &&
                <section className='explanation test'>
                  <h4>Explanation</h4>
                  <div className='explanation-text'>{wrapString(getCurrentQuestion().explanation).map(sentence => (
                    <p>{sentence}</p>
                  ))}</div>

                </section>
              }

              {getSelectedAnswer() &&
                <button
                  data-testid='next-question-button'
                  onClick={nextQuestion}>
                  {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}</button>
              }

            </section>
          </section>

        </>

      }

    </>
  )
}

export default Quiz