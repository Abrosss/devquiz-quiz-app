import React from 'react'
function Answers({ answers, checkAnswer, selectedAnswer }) {
    const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    return (
        <>
            {answers.map((answer, index) => (

                <div
                    key={index}
                    onClick={() =>
                        checkAnswer(answer)}
                    className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}>
                    <span>{optionLetters[index]}</span>
                    <span>{answer.title}</span>
                </div>

            ))}
        </>
    )
}

export default Answers