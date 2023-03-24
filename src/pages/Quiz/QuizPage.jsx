import { useState, useEffect, useMemo } from 'react'
import { useLocation, useParams  } from 'react-router-dom'

import axios from '../../api/axios';
import '../../App.css'
import '../../styles.css'
import './QuizPage.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProgressBar from '../../components/ProgressBar'
import Answers from '../../components/Answers';
import Result from '../../components/Result';
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import Question from '../../components/Question';
import { filterAnswers } from '../../functions/functions';
function QuizPage() {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true)

  //CATEGORY DATA
  const category = location.state?.category
  const categoryId = location.state?.category._id;

  //QUESTIONS
  const [questions, setQuestions] = useState([])
  const [quizState, setQuizState] = useState({
    quizIsFinished: false,
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    quizResults: [],
    progressBarArray: []
  });
  const { quizIsFinished, currentQuestionIndex, correctAnswerCount, quizResults, progressBarArray } = quizState
  useEffect(() => {
    async function getQuestions() {
      setIsLoading(true)
      const response = await axios.get(`/questions/${categoryId}`)
      setQuestions(response.data)
      setAnswers(response.data[currentQuestionIndex].answers)
      setQuizState(prevState => ({
        ...prevState,
        progressBarArray: Array.from({ length: response.data.length }, () => Object.assign({}, { isCorrect: null }))
      }));

      setIsLoading(false)
    }
    getQuestions()
  }, [])




  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])


  const amountOfQuestions = questions.length
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);


  //FUNCTIONS

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
  function recordAnswer(answer) {
    const answerSelected = selectedAnswer !== null;
    if (!answerSelected) {
      setSelectedAnswer(answer)
      const answersToDisplay = filterAnswers(answer, currentQuestion.answers)
      setAnswers(answersToDisplay)
      if (answer.correct) {
        setQuizState(prevState => ({
          ...prevState,
          correctAnswerCount: prevState.correctAnswerCount + 1
        }));

      }
      updateProgressBar(answer, currentQuestionIndex)
      const currentResultStat = recordStat(currentQuestion, answer)
      setQuizState(prevState => ({
        ...prevState,
        quizResults: [...prevState.quizResults, currentResultStat]
      }));

    }

  }

  //HELP FUNCTIONS
  const updateProgressBar = (answer, index) => {
    if (answer) {
      const updatedArray = [...progressBarArray];
      updatedArray[index].isCorrect = answer?.correct;
      setQuizState(prevState => ({
        ...prevState,
        progressBarArray: updatedArray
      }));

    }
  }

  function recordStat(question, selectedAnswer) {
    let correctAnswer = question.answers.find(answer => answer.correct)
    return {
      question: question, selectedAnswer: selectedAnswer, correctAnswer: correctAnswer
    }
  }
  function handleRestartQuiz() {
    setQuizState(prevState => ({
      ...prevState,
      quizIsFinished: false,
      currentQuestionIndex: 0,
      correctAnswerCount: 0,
      quizResults: [],
      progressBarArray: Array.from({ length: questions.length }, () => Object.assign({}, { isCorrect: null }))

    }));


  }
  //RESET ANSWERS WHEN A QUESTION IS CHANGED

  useEffect(() => {

    setSelectedAnswer(null)
    setAnswers(questions[currentQuestionIndex]?.answers)

  }, [currentQuestion])


function wrapString(string) {
  return string.split(';')
}

  return (
    <>
      <Header />
      {isLoading ?
        <section data-testid="container" className='container-content'>
          <Loading />
        </section>

        :
        !quizIsFinished ?
          <section className='container'>

            <Navigation
              currentPage={category.title}
              backTo="All Tests"
              linkTo='/'
            />

            <ProgressBar 
            progressBarArray={progressBarArray} 
            currentQuestionIndex={currentQuestionIndex} 
            />



            {questions.length > 0 &&
              <section className='quiz'>
               <Question
               currentQuestion={currentQuestion}
               currentIndex={currentQuestionIndex}
               amountOfQuestions={amountOfQuestions}
               />
                <section className='answers'>
                  <Answers answers={answers} checkAnswer={recordAnswer} selectedAnswer={selectedAnswer} />
                  {selectedAnswer && currentQuestion.explanation &&
                    <section className='explanation test'>
                      <h4>Explanation</h4>
                      <div className='explanation-text'>{wrapString(currentQuestion.explanation).map(sentence => (
                        <p>{sentence}</p>
                      ))}</div>

                    </section>
                  }
                  {selectedAnswer &&
                    <button data-testid='next-question-button' onClick={nextQuestion}>{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}</button>
                  }


                </section>


              </section>

            }


          </section> :
          <Result
            correctAnswerCount={correctAnswerCount}
            amountOfQuestions={amountOfQuestions}
            handleRestartQuiz={handleRestartQuiz}
          />
      }







      <Footer position={quizIsFinished || isLoading ? "fixed" : ""} />
    </>
  )
}

export default QuizPage
