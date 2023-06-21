import React, { useState } from 'react'

function colorButton(answer, selectedAnswer) {
  console.log( selectedAnswer)
    if (selectedAnswer === null) {
      return "answer";
    } else if (answer === true) {
      return "answer correct";
    } else if (answer === false) {
      return "answer incorrect";
    } 
  }
function Answers({ answers, checkAnswer, selectedAnswer }) {
    console.log(answers)

    return (
        <>
            {answers?.map((answer, index) => (

                <div
                    key={index}
                    data-testid= {`answer-${index}`}
                    className={colorButton(answer.correct, selectedAnswer)}
                    onClick={() => checkAnswer (answer)}
                    
    >       
                    <div className={selectedAnswer ? 'answers-section__letter selected' : 'answers-section__letter'}>
                    <span>{answer.letter && answer.letter}</span>
                    </div>
                    <div><span>{answer.title}</span></div>
                   
                </div>

            ))}
         
        </>
    )
}

export default Answers