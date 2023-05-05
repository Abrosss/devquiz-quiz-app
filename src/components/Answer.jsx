import React, { useState } from 'react'
function Answer({ answers, checkAnswer, selectedAnswer }) {


    return (
        <>
            {answers.map((answer, index) => (

                <div
                    key={index}
                    className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}
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