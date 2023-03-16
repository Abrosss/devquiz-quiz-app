import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import axios from '../api/axios';
import '../App.css'
import '../styles.css'
import Question from '../components/Question.jsx'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProgressBar from '../components/ProgressBar'
function Quiz() {

  const location = useLocation();

  const category = location.state?.category
  const categoryId = location.state?.category._id;
const resultPoint = {
  question: "",
  selectedAnswer: "",
  correctAnswer: "",
  explanation: "0"
}
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [result, setResult] = useState([])
  const [answered, setAnswered] = useState(false)
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  const amountOfQuestions = questions.length
  const currentQuestion = questions[currentQuestionIndex]

console.log(count)
  const [filteredAnswers, setFilteredAnswers] = useState([])
  const [optionLetters, setOptionLetters] = useState(["A", "B", "C", "D", "E"])
  useEffect(() => {

    setSelectedAnswer(null)
    if(currentQuestion ===0) setFilteredAnswers([]) 
    else setFilteredAnswers(questions[currentQuestionIndex]?.answers)
  }, [currentQuestion])
  useEffect(() => {
    async function getQuestions() {
      const response = await axios.get(`/questions/${categoryId}`)
      setQuestions(response.data)
      setFilteredAnswers(response.data[currentQuestionIndex].answers)
    }
    getQuestions()
  }, [])
  function nextQuestion() {
    setAnswered(false)
    console.log(selectedAnswer)
    if (currentQuestionIndex === questions.length - 1) {
      // if currentQuestion is the last question in the array, do not update it
      return;
    }
    setCurrentQuestionIndex(prev => prev + 1);
  
  }
 
console.log(count)
  function checkAnswer(answer) {
    setSelectedAnswer(answer)
    if(answer.correct) {
      console.log('wdwf')
      setCount(prev => prev+1)
    }
    let correctAnswer = currentQuestion.answers.find(answer => answer.correct)
    setResult([...result, {question:currentQuestion, selectedAnswer: answer, correctAnswer:correctAnswer}])

    if (answer.correct) {
      setFilteredAnswers(filteredAnswers.filter((ans) => ans.correct));
 
    }
    else {
      setFilteredAnswers(filteredAnswers.filter((ans) => {
        return ans.correct || answer === ans
      }));
    }
  }
  return (
    <>
      <Header />
      {
        result.length !== questions.length ?
<section className='container'>

<nav>
  <Link
    className='highlighted'
    to='/'>All Tests</Link>
  <span> / {category.title}</span>
</nav>

<ProgressBar questions={questions} currentQuestion={currentQuestionIndex} />



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

{filteredAnswers.map((answer, index) => (

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
      <button onClick={nextQuestion}>Next Question</button>
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
      
      <Footer position="fixed" />
    </>
  )
}

export default Quiz
