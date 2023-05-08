import React from 'react'
import { ProgressBar } from './ProgressBar'
import QuestionScreen from './QuestionScreen';
import Answer from './Answer';
import { useState } from 'react';
function Quizzer({ questions }) {
  const [quizState, setQuizState] = useState({
    currentQuestionIndex: 0,
    correctAnswerCount: 0
  });
  const { currentQuestionIndex, correctAnswerCount } = quizState
  const [progressTracking, setProgressTracking] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null })))
  const [visibleAnswers, setVisibleAnswers] = useState(getCurrentQuestion().answers)
  const [userResults, setUserResults] = useState(Array.from({ length: questions.length }, () => Object.assign({}, { question: null, correctAnswer: null, selectedAnswer: null })))

  function getCurrentQuestion() {
    return questions[currentQuestionIndex];
  }
  function saveUserResults(question, correctAnswer, selectedAnswer) {

    setUserResults(prevResults => {
      const newResults = [...prevResults];
      newResults[currentQuestionIndex] = { ...newResults[currentQuestionIndex], question: question, correctAnswer: correctAnswer, selectedAnswer: selectedAnswer };
      return newResults;
    });
  }
  const updateProgressBar = (answer, index) => {
    if (!answer) {
      return;
    }

    const updatedArray = [...progressTracking];
    updatedArray[index].isCorrect = answer.correct;
    setProgressTracking(updatedArray);

  }
  function filterAnswers(selectedAnswer, allAnswers) {
    if (selectedAnswer.correct) {
      return [selectedAnswer];
    }
    else {
      return allAnswers.filter(answer => answer.title === selectedAnswer.title || answer.correct);
    }
  }
  function checkAnswer(answer) {
    const answerSelected = userResults[currentQuestionIndex].selectedAnswer !== null; //avoid click dublication
    if (answerSelected) return

    let correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct)
    saveUserResults(questions[currentQuestionIndex], correctAnswer, answer)

    updateProgressBar(answer, currentQuestionIndex)

    const answersToDisplay = filterAnswers(answer, questions[currentQuestionIndex].answers)
    setVisibleAnswers(answersToDisplay)

    if (answer.correct) {
      setQuizState(prevState => ({
        ...prevState,
        correctAnswerCount: prevState.correctAnswerCount + 1
      }));

    }


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
        <section className='answers'>
          <Answer
            answers={visibleAnswers}
            checkAnswer={checkAnswer}
            selectedAnswer={userResults[currentQuestionIndex].selectedAnswer}
          />
        </section>
      </section>
    </>
  )
}

export default Quizzer