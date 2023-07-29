import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import { Quizzy } from '../components/Quizzy';
import Loading from '../components/Loading';
import EditableList from '../components/Admin/EditableList'
import { UserContext } from '../context/User'



import { randomizeArray } from '../helpFunctions';
function SharedQuiz() {
  const navigate = useNavigate();
const {isAdmin} = useContext(UserContext)

  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)

  const [questions, setQuestions] = useState([])
  const [quiz, setQuiz] = useState({})
  const { id } = useParams();

 console.log(id)

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);

        const quiz = await axios.get(`/sharedQuiz/${id}`);
        const questions = quiz.data[0].questions
        console.log(quiz, questions)
        setQuiz(quiz.data[0]);
      
        const randomizedArray =  randomizeArray(questions);
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
      <Header link={isAdmin ? '/admin/tests' : '/'} />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :

        <section className='container'>
          {/* <Navigation
            currentPage={quiz.title}
            linkToText="All Tests"
            linkTo={isAdmin ? "/admin/tests" : "/"}
          /> */}
          {questions.length === 0 ?

            <div>No questions added yet!</div> :

            isAdmin ?
              <div><EditableList quizData={quiz} questions={questions} setQuestions={setQuestions} /></div>
              : <Quizzy questions={questions} />


          }

        </section>

      }


    </>
  )



}

export default SharedQuiz
