import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import jwtDecode from 'jwt-decode'
import { Quiz } from '../components/Quiz';
import Loading from '../components/Loading';
import EditableList from '../components/Admin/EditableList'
import { UserContext } from '../context/User'
import Timer from '../components/Timer';


import { randomizeArray } from '../helpFunctions';
function AllQuestions() {
  const navigate = useNavigate();
const {isAdmin} = useContext(UserContext)

  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [timeIsUp, setTimeIsUp] = useState(false)
  const [questions, setQuestions] = useState([])
  const [quiz, setQuiz] = useState({})
  const { quizID } = useParams();

  function timeout () {
    setTimeIsUp(true)
}

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);

        const questions = await axios.get(`/questions/${quizID}`);
        const quiz = await axios.get(`/quizzes/${quizID}`);

        setQuiz(quiz.data[0]);
      
        const randomizedArray =  randomizeArray(questions.data);
        if(!isAdmin) setQuestions(randomizedArray);
        else setQuestions(questions.data)
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
      <Header link={isAdmin ? '/admin/tests' : '/'} />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :

        <section className='container'>
          <section className='flex space-between'>
          <Navigation
            currentPage={quiz.title}
            linkToText="All Tests"
            linkTo={isAdmin ? "/admin/tests" : "/"}
          />
           <div>
                <span><Timer initialTime={40} onTimeout={timeout}></Timer></span>
            </div>
            </section>
          {questions.length === 0 ?

            <div>No questions added yet!</div> :

            isAdmin ?
              <div><EditableList quizData={quiz} questions={questions} setQuestions={setQuestions} /></div>
              : <Quiz questions={questions} timeout = {timeIsUp}/>


          }

        </section>

      }


    </>
  )



}

export default AllQuestions
