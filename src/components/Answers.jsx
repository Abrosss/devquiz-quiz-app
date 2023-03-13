import React from 'react'
import { useState } from 'react'
function Answers({question}) {
    const [answerIsCorrect, setAnswerIsCorrect] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [filteredAnswers, setFilteredAnswers] = useState(question.answers)
  
    console.log(filteredAnswers)
     function checkAnswer(answer) {
      setSelectedAnswer(answer.letter)

      if(answer.correct) {
        setAnswerIsCorrect(true)
        setFilteredAnswers(filteredAnswers.filter((ans) => ans.correct));
      }
      else {
        setAnswerIsCorrect(false)
        setFilteredAnswers(filteredAnswers.filter((ans) => {
          return ans.correct || answer.letter === ans.letter
        }));
      }
     }
  
    console.log(selectedAnswer, answerIsCorrect)
    return (
        <section className='answers'>
            {filteredAnswers.map(answer => (

                <div onClick={() => checkAnswer(answer)} className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}>
                    <span>{answer.letter}</span>
                    <span>{answer.title}</span>
                </div>

            ))}
            {selectedAnswer &&
                <section className='explanation'>
                    <h4>Explanation</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum soluta libero? Id dolorum aspernatur itaque possimus iusto, nobis magnam quos in cum aliquid corporis, excepturi est enim, a et?</p>

                </section>
            }

        </section>
    )
}

export default Answers