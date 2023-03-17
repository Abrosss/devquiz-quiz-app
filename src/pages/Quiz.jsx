import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from '../api/axios';
import '../App.css'
import '../styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProgressBar from '../components/ProgressBar'
function Quiz() {

  const location = useLocation();

  //CATEGORY DATA
  const category = location.state?.category
  const categoryId = location.state?.category._id;

  //QUESTIONS
  const [questions, setQuestions] = useState([])
  const [progressBarArray, setProgressBarArray] = useState([]);
  useEffect(() => {
    async function getQuestions() {
      const response = await axios.get(`/questions/${categoryId}`)
      setQuestions(response.data)
      setAnswers(response.data[currentQuestionIndex].answers)
      setProgressBarArray(Array.from({ length: response.data.length }, () => Object.assign({}, defaultObject)));
    }
    getQuestions()
  }, [])

  const arrayLength = questions.length;
  const defaultObject = { isCorrect: null };


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizIsFinished, setQuizIsFinished] = useState(false)
  const [result, setResult] = useState([])
  const [count, setCount] = useState(0)
  const [answers, setAnswers] = useState([])
  

  const amountOfQuestions = questions.length
  const currentQuestion = questions[currentQuestionIndex]
  const optionLetters = ["A", "B", "C", "D", "E"]

//FUNCTIONS
console.log(progressBarArray)
function nextQuestion() {
  if (currentQuestionIndex === questions.length - 1) {
    setQuizIsFinished(true)
  }
  else {
    setCurrentQuestionIndex(prev => prev + 1);
  }
}
async function checkAnswer(answer) {
  if(!selectedAnswer) {
    setSelectedAnswer(answer)
    const answersToDisplay = await filterAnswers(answer, currentQuestion.answers)
    setAnswers(answersToDisplay)
    if (answer.correct) {
      setCount(prevState => prevState + 1)
    }
    handleAnswer(answer, currentQuestionIndex)
    const currentResultStat = recordStat(currentQuestion, answer)
    setResult([...result, currentResultStat])
  }
  
}

//HELP FUNCTIONS
const handleAnswer = (answer, index) => {
  console.log(answer)
  if(answer) {
    const updatedArray = [...progressBarArray]; // create a copy of the array
    console.log(updatedArray)
    updatedArray[index].isCorrect = answer?.correct; // update the isCorrect property of the object at the specified index
    setProgressBarArray(updatedArray); // update the state with the updated array
  }
}
function filterAnswers(selectedAnswer, allAnswers) {
  return allAnswers.filter(answer => answer === selectedAnswer || answer.correct);
}
function recordStat (question, selectedAnswer) {
  let correctAnswer = question.answers.find(answer => answer.correct)
  return {
    question:question, selectedAnswer: selectedAnswer, correctAnswer: correctAnswer
  }
}

//RESET ANSWERS WHEN A QUESTION IS CHANGED

  useEffect(() => {

    setSelectedAnswer(null)
    setAnswers(questions[currentQuestionIndex]?.answers)
    
  }, [currentQuestion])



 
  return (
    <>
      <Header />
      {!quizIsFinished ?
        <section className='container'>

          <nav>
            <Link
              className='highlighted'
              to='/'>All Tests</Link>
            <span> / {category.title}</span>
          </nav>

          <ProgressBar progressBarArray={progressBarArray} currentQuestionIndex={currentQuestionIndex} />



          {questions.length > 0 &&
            <section className='quiz'>
              <section className='question'>

                <span>Question {currentQuestionIndex + 1} / {amountOfQuestions}</span>

                <h2>{currentQuestion.title}</h2>

                <div className='question-image-container'>
                  <img className='question-image' src={currentQuestion.image}></img>
                </div>


              </section>
              <section className='answers'>

                {answers.map((answer, index) => (

                  <div onClick={() => checkAnswer(answer)} className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}>
                    <span>{optionLetters[index]}</span>
                    <span>{answer.title}</span>
                  </div>

                ))}
                {selectedAnswer && currentQuestion.explanation &&
                  <section className='explanation test'>
                    <h4>Explanation</h4>
                    <p>{currentQuestion.explanation}</p>

                  </section>
                }
                {selectedAnswer &&
                  <button onClick={nextQuestion}>{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}</button>
                }


              </section>


            </section>

          }


        </section> :
        <section className='container-content'>

          <h2>You're finished!</h2>
          <p>Result: {count}/{amountOfQuestions}</p>
          <Link to="/" className='button'>Back To Tests</Link>
          <span className='highlighted'>Restart</span>





        </section>
      }





      <Footer position={quizIsFinished ? "fixed" : ""} />
    </>
  )
}

export default Quiz
