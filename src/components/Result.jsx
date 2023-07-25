import React from "react";
import { Link } from "react-router-dom";
import Restart from "../assets/restart.svg";
function Result(props) {
  const { correctAnswerCount, amountOfQuestions, handleRestartQuiz, shared } = props;
  return (
    <div className="container-content">
      <h2>You're finished!</h2>
      <p>
        Result: {correctAnswerCount}/{amountOfQuestions}
      </p>
      <div className="result">
        {!shared &&
           <Link to="/" className="button btn">
           Back To Tests
         </Link>
        }
     
        <button
          className={shared ? "button" : "button no-background buttonWithIcon"}
          onClick={handleRestartQuiz}
        >
          {!shared &&  <img className="icon" src={Restart} alt="restart"></img>}
         
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
}

export default Result;
