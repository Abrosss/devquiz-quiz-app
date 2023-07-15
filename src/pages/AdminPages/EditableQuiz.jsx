import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

import Loading from '../../components/Loading';
import EditableList from '../../components/Admin/EditableList'




function EditableQuiz() {


  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)

  const [questions, setQuestions] = useState([])
  const [quiz, setQuiz] = useState({})
  const { quizID } = useParams();

 

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);

        const questions = await axios.get(`/questions/${quizID}`);
        const quiz = await axios.get(`/quizzes/${quizID}`);
        setQuiz(quiz.data[0]);
         setQuestions(questions.data)
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
      <Header link='/admin/tests' />
      {isLoading ?
        <section className='container-content'>
          <Loading />
        </section>

        :

        <section className='container'>
          <Navigation
            currentPage={quiz.title}
            linkToText="All Tests"
            linkTo="/admin/tests"
          />
          {questions.length === 0 ?

            <div>No questions added yet!</div> :

              <div><EditableList quizData={quiz} questions={questions} setQuestions={setQuestions} /></div>

          }

        </section>

      }


    </>
  )



}

export default EditableQuiz
