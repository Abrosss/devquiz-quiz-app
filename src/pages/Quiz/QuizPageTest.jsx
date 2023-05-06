import { useState, useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import axios from '../../api/axios';
import '../../App.css'
import '../../styles.css'
import './QuizPage.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProgressBar from '../../components/ProgressBar'

import Result from '../../components/Result';
import Loading from '../../components/Loading';
import Navigation from '../../components/Navigation';
import Quiz from '../../components/Quiz';

function QuizPage() {

  const location = useLocation();  //will delete later will delete later will delete later will delete later 
  //CATEGORY DATA
  const category = location.state?.category
  const categoryId = location.state?.category._id; //will delete later will delete later will delete later will delete later



  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [userResults, setUserResults] = useState([])
  const [progressTracking, setProgressTracking] = useState([])
  const [quizState, setQuizState] = useState({
    quizIsFinished: false,
    currentQuestionIndex: 0,
    correctAnswerCount: 0
  });
  const { quizIsFinished, currentQuestionIndex, correctAnswerCount } = quizState

  useEffect(() => {
    async function init() {
      setIsLoading(true)
      const response = await axios.get(`/questions/${categoryId}`) //change to url hash search later
      setQuestions(response.data)
      setUserResults(Array.from({ length: response.data.length }, () => Object.assign({}, { question: null, correctAnswer: null, selectedAnswer: null })))
      setProgressTracking(Array.from({ length: response.data.length }, () => Object.assign({}, { isCorrect: null })))
      setIsLoading(false)
    }
    init()
  }, [])
  function handleRestartQuiz() {
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
  const updateProgressBar = (answer, index) => {
    if (answer) {
      const updatedArray = [...progressTracking];
      updatedArray[index].isCorrect = answer?.correct;
      setProgressTracking(updatedArray)

    }
  }
  return (
    <>
      <Header />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :
        !quizIsFinished ?
          <section className='container'>
            <Navigation
              currentPage={category.title}
              linkToText="All Tests"
              linkTo='/'
            />
            <ProgressBar
              questionsTracking={progressTracking}
              currentQuestionIndex={currentQuestionIndex}
            />
            {questions.length > 0 &&
              <Quiz
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                setUserResults={setUserResults}
                userResults={userResults}
                setQuizState={setQuizState}
                updateProgressBar={updateProgressBar}
              />


            }
          </section>
          :
          <Result
            correctAnswerCount={correctAnswerCount}
            amountOfQuestions={questions.length}
            handleRestartQuiz={handleRestartQuiz}
          />
      }


    </>
  )



}

export default QuizPage
