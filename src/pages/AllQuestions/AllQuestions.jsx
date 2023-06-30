import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Cookies from 'js-cookie';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { Quiz } from '../../components/Quiz';
import Loading from '../../components/Loading';
import EditableList from '../../components/Admin/EditableList'
import '../../styles.css';
import './AllQuestions.css';

import { randomizeArray } from '../../helpFunctions';
function QuizPage() {
  const navigate = useNavigate();


  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [questions, setQuestions] = useState([])
  const [quiz, setQuiz] = useState({})
  const { quizID } = useParams();

  useEffect(() => {
    const authToken = Cookies.get('auth_token');

    if (authToken) {
      setLoggedIn(true)
   
    } 
  
  }, []);
  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);

        const questions = await axios.get(`/questions/${quizID}`);
        const quiz = await axios.get(`/quizzes/${quizID}`);

        setQuiz(quiz.data[0]);
      
        const randomizedArray =  randomizeArray(questions.data);
    
        setQuestions(randomizedArray);
        setIsLoading(false);

      } catch (error) {
        console.error(error);
        // Handle error here (e.g., display an error message)
      }


    }
    init()
  }, [])



  return (
    <>
      <Header link={loggedIn ? '/admin/tests' : '/'} />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :

        <section className='container'>
          <Navigation
            currentPage={quiz.title}
            linkToText="All Tests"
            linkTo={loggedIn ? "/admin/tests" : "/"}
          />
          {questions.length === 0 ?

            <div>No questions added yet!</div> :

            loggedIn ?
              <div><EditableList quizData={quiz} questions={questions} setQuestions={setQuestions} /></div>
              : <Quiz questions={questions} />


          }

        </section>

      }


    </>
  )



}

export default QuizPage
