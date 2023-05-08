import { useState, useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import axios from '../../api/axios';
import '../../App.css'
import '../../styles.css'
import './QuizPage.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Quizzer from '../../components/Quizzer';
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
  const [progressTracking, setProgressTracking] = useState([])


  useEffect(() => {
    async function init() {
      setIsLoading(true)
      const response = await axios.get(`/questions/${categoryId}`) //change to url hash search later
      setQuestions(response.data)
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
 
  return (
    <>
      <Header />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :
   
          <section className='container'>
            <Navigation
              currentPage={category.title}
              linkToText="All Tests"
              linkTo='/'
            />
           <Quizzer questions={questions}/>
          </section>
        
      }


    </>
  )



}

export default QuizPage
