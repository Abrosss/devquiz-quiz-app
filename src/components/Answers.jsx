import React from 'react'
function Answers({ answers, checkAnswer, selectedAnswer }) {

    return (
        <>
            {answers.map((answer, index) => (

                <div
                    key={index}
                    onClick={() =>
                        checkAnswer(answer)}
                    className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}>
                    <span>{answer.letter && answer.letter}</span>
                    <span>{answer.title}</span>
                </div>

            ))}
        </>
    )
}

export default Answers