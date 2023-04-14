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

import { filterAnswers } from '../../functions/functions';
function QuizPage() {

  const location = useLocation();  //will delete later will delete later will delete later will delete later 
  //CATEGORY DATA
  const category = location.state?.category
  const categoryId = location.state?.category._id; //will delete later will delete later will delete later will delete later



  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [userResults, setUserResults] = useState([])
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
      setIsLoading(false)
    }
    init()
  }, [])

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
          <ProgressBar
            questionsTracking={userResults}
            currentQuestionIndex={currentQuestionIndex}
          />
          {questions.length > 0 &&
          <Quiz
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setUserResults={setUserResults}
          userResults={userResults}
          />
             

            }
        </section>
      }
    </>
  )



}

export default QuizPage
