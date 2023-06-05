import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../../api/axios';

import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import { Quiz } from '../../../components/Quiz';
import Loading from '../../../components/Loading';
import EditableList from '../../../components/Admin/EditableList'
import '../../../styles.css';
import './QuizPage.css';


function QuizPage() {
  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [quiz, setQuiz] = useState({})
  const { quizID } = useParams();
  console.log(loggedIn)

  useEffect(() => {
    async function init() {

      setIsLoading(true)
      const questions = await axios.get(`/questions/${quizID}`) //change to url hash search later
      const quiz = await axios.get(`/quizzes/${quizID}`)

      setQuiz(quiz.data[0])
      setQuestions(questions.data)
      setIsLoading(false)
    }
    init()
  }, [])



  return (
    <>
      <Header link='/tests' />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :

        <section className='container'>
          <Navigation
            currentPage={quiz.title}
            linkToText="All Tests"
            linkTo="/tests"
          />
          {questions.length === 0 ?

            <div>No questions added yet!</div> :
            <Quiz questions={questions} />


          }

        </section>

      }


    </>
  )



}

export default QuizPage
