import React from 'react'
import { Link } from 'react-router-dom';
import Restart from '../assets/restart.svg'
function Result(props) {
  const { correctAnswerCount, amountOfQuestions, handleRestartQuiz } = props;
  return (
    <div className="container-content">
      <h2>You're finished!</h2>
      <p>Result: {correctAnswerCount}/{amountOfQuestions}</p>
      <div>
       
        <Link to="/" className='button'>Back To Tests</Link>
        <button className='button no-background buttonWithIcon' onClick={handleRestartQuiz}>
          <img className='icon' src={Restart} alt="restart"></img>
          <span>Restart</span>
        </button>
        </div>

    </div>
  )
}

export default Result