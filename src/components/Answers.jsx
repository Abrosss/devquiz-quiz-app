import React, { useState } from 'react'
function Answers({ answers, recordAnswer, selectedAnswer }) {
    const [visibleAnswers, setVisibleAnswers] = useState(answers) 
    function filterAnswers(selectedAnswer, allAnswers) {
        if (selectedAnswer.correct) {
          return [selectedAnswer];
        }
        else {
          return allAnswers.filter(answer => answer.title === selectedAnswer.title || answer.correct);
        }
      }
    function checkAnswer(option) {
        const answerSelected = selectedAnswer !== null;
        const correctAnswer = answers.filter(answer => answer.correct)
        console.log(answerSelected)
        if (!answerSelected) {
            setUserResults(...userResults, {option})
          const answersToDisplay = filterAnswers(option, answers)
          setVisibleAnswers(answersToDisplay)

    
        }
    }

    return (
        <>
            {visibleAnswers.map((answer, index) => (

                <div
                    key={index}
                    className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}
                    onClick={() => recordAnswer (answer)}
                    
    >       
                    <span className='letter'>{answer.letter && answer.letter}</span>
                    <span>{answer.title}</span>
                </div>

            ))}
            {/* {answers.map((answer, index) => (

                <div
                    key={index}
                    onClick={() =>
                        checkAnswer(answer)}
                    className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}>
                    <span className='letter'>{answer.letter && answer.letter}</span>
                    <span>{answer.title}</span>
                </div>

            ))} */}
        </>
    )
}

export default Answers