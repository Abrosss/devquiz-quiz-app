import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../api/axios';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Quiz from '../../components/Quiz';
import Loading from '../../components/Loading';

import '../../App.css';
import '../../styles.css';
import './QuizPage.css';


function QuizPage() {

  const location = useLocation();  //will delete later will delete later will delete later will delete later 
  //CATEGORY DATA
  const category = location.state?.category
  const categoryId = location.state?.category._id; //will delete later will delete later will delete later will delete later



  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    async function init() {

      setIsLoading(true)
      const response = await axios.get(`/questions/${categoryId}`) //change to url hash search later
      setQuestions(response.data)
      setIsLoading(false)
    }
    init()
  }, [])


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
          <Quiz questions={questions} />
        </section>

      }


    </>
  )



}

export default QuizPage
