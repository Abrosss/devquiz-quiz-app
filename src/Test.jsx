import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import './App.css'
import Question from './components/Question.jsx'
import Answers from './components/Answers'
import Header from './components/Header'
import Footer from './components/Footer'
import axios from './api/axios';
function Test() {
  const location = useLocation();
  const category = location.state?.category
  const categoryId = location.state?.category._id;
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
    setAnswered(false)
    if (currentQuestion === questions.length - 1) {
      // if currentQuestion is the last question in the array, do not update it
      return;
    }
    setCurrentQuestion(prev => prev + 1);
  }
  console.log(questions)
  return (
    <div>
      <Header/>
    <section className='container'>
      <section className='headingNav'>
        <div><Link className='blue' to ='/categories'>All Tests</Link><span> / {category.title}</span></div>
      
    <section className='progress'>
    {questions.map((question, index) => (
      <div className={currentQuestion === index ? 'cell active' : 'cell'}>{index+1}</div>
    ))}

    </section>
      </section>
  
    
      {questions.length > 0 &&
       <section className='quiz'>
         <section className='question'>
        <span>Question {currentQuestion+1} / {questions.length}</span>
        <h2>{questions[currentQuestion].title}</h2>
    <div>
    <img className='question-image' src={questions[currentQuestion].image}></img>
    </div>
         
       
        </section>
        <Question number={currentQuestion} question={questions[currentQuestion]} answered={answered} setAnswered={setAnswered}  nextQuestion={nextQuestion}/>
    
       </section>
     
      }
      
      
    </section>
      <Footer/>
    </div>
  )
}

export default Test
