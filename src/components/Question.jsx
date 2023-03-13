import React, { useState, useEffect } from 'react'

function Question({ question, number, nextQuestion, answered, setAnswered }) {
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [filteredAnswers, setFilteredAnswers] = useState(question.answers)
 
  useEffect(() => {
    setFilteredAnswers(question.answers)
    setSelectedAnswer(null)
    setAnswerIsCorrect(null)
  }, [question])
  console.log(filteredAnswers)
  function checkAnswer(answer) {
    setSelectedAnswer(answer.letter)
    setAnswered(true)
    if (answer.correct) {
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
    <>

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
        {answered &&
              <button onClick={nextQuestion}>Next Question</button>
            }

      </section>
    </>
  )
}

export default Question