import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from '../../api/axios';

import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import {Quiz} from '../../components/Quiz';
import Loading from '../../components/Loading';
import EditTest from '../EditTest/EditTest'
import '../../App.css';
import '../../styles.css';
import './QuizPage.css';


function QuizPage({isAdmin}) {
  let categoriesData = [
    {
      id: "001001",
      title: "Programming",
      hash: "programming"
    },
    {
      id: "001002",
      title: "Programming Tules",
      hash: "programming_tules"
    }
  ]
  let questionsData = [
    {
      id: "001002",
      title: "Programmingafa",
      image: "",
      explanation: "explanationssesgesg",
      category: "001001",
      answers: [
        {
          title: "answer1",
          correct: true,
          letter : 'A'
        },
        {
          title: "answer2",
          correct: false,
          letter : 'B'
        }
      ]
    },
    {
      id: "001003",
      title: "Programmingafa",
      image: "",
      explanation: "explanationssesgesg",
      category: "001001",
      answers: [
        {
          title: "answer1",
          correct: true,
          letter : 'A'
        },
        {
          title: "answer2",
          correct: false,
          letter : 'B'
        }
      ]
    },
    {
      id: "001004",
      title: "Programmingafa",
      image: "",
      explanation: "explanationssesgesg",
      category: "001001",
      answers: [
        {
          title: "answer1",
          correct: true,
          letter : 'A'
        },
        {
          title: "answer2",
          correct: false,
          letter : 'B'
        }
      ]
    }
  ]
  const { hash } = useParams();

  //GRAB QUESTIONS
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [category, setCategory] = useState({})
console.log(category, questions)
  useEffect(() => {
     function init() {

      setIsLoading(true)
      const category = categoriesData.find(category => category.hash === hash)
      const questions = questionsData.filter(question => question.category === category.id)
      console.log(questions)
      setCategory(category)
      setQuestions(questions)
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
            linkTo={isAdmin ? "/admin/tests" : "/tests"}
          />
          {questions.length === 0 ?

          <div>No questions added yet!</div> :
          
          isAdmin ? 
            <div><EditTest questions={questions} setQuestions={setQuestions}/></div>
            : <Quiz questions={questions} />
          
        
        }
          
        </section>

      }


    </>
  )



}

export default QuizPage