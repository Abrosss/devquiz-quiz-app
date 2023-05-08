import React, { useState } from 'react'
function colorButton(answer, selectedAnswer) {
    if (selectedAnswer === null) {
      return "answer";
    } else if (answer === true) {
      return "answer correct";
    } else if (answer === false) {
      return "answer incorrect";
    } 
  }
function Answer({ answers, checkAnswer, selectedAnswer }) {
    

    return (
        <>
            {answers.map((answer, index) => (

                <div
                    key={index}
                    className={colorButton(answer.correct, selectedAnswer)}
                    onClick={() => checkAnswer (answer)}
                    
    >       
                    <span className='letter'>{answer.letter && answer.letter}</span>
                    <span>{answer.title}</span>
                </div>

            ))}
         
        </>
    )
}

export default Answer