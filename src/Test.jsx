import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import './App.css'
import Question from './components/Question.jsx'
import Answers from './components/Answers'
import axios from './api/axios';
function Test() {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answered, setAnswered] = useState(false)
  console.log(location)
  // const questions = [
  //   {
  //     category: "Paradigm",
  //     questions: [
  //       {
  //         id:0,
  //         title: "What is a functional paradigm",
  //         image: "https://courses.cs.washington.edu/courses/cse341/03au/slides/Paradigms/img004.GIF",
  //         answers: [
  //           {
  //             id:0,
  //             letter: "A",
  //             title: 'Answer 1',
  //             correct: true
  //           },
  //           {
  //             id:0,
  //             letter: "B",
  //             title: 'Answer 1',
  //             correct: false
  //           },
  //           {
  //             id:0,
  //             letter: "C",
  //             title: 'Answer 1',
  //             correct: false
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     category: "Inheritance",
  //     questions: [
  //       {
  //         id:0,
  //         title: "What is a functional paradigm",
  //         image: "https://courses.cs.washington.edu/courses/cse341/03au/slides/Paradigms/img004.GIF",
  //         answers: [
  //           {
  //             id:0,
  //             letter: "A",
  //             title: 'Answer 1',
  //             correct: true
  //           },
  //           {
  //             id:0,
  //             letter: "B",
  //             title: 'Answer 1',
  //             correct: false
  //           },
  //           {
  //             id:0,
  //             letter: "C",
  //             title: 'Answer 1',
  //             correct: false
  //           }
  //         ]
  //       }
  //     ]
  //   },
   
  // ]
  const { testCategory } = useParams();
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState(questions.filter(question => question.category.toLowerCase() === testCategory)[0])
  useEffect(() => {
    async function getQuestions() {
      const response = await axios.get(`/questions/${categoryId}`)
      setQuestions(response.data)
    }
    getQuestions()
  }, [])
  function nextQuestion() {
    if (currentQuestion === questions.length - 1) {
      // if currentQuestion is the last question in the array, do not update it
      return;
    }
    setCurrentQuestion(prev => prev + 1);
  }
  console.log(questions)
  return (
    <div>
      <header></header>
      <button className='finish'>Finish the test</button>
      <Link to ='/categories'>Categories</Link><span>/Paradigms</span>
      {questions.length > 0 &&
       <section className='quiz'>
        <Question question={questions[currentQuestion]} answered={setAnswered}/>
    
       </section>
     
      }
      {answered &&
      <button onClick={nextQuestion}>Next Question</button>
      }
      
    </div>
  )
}

export default Test
