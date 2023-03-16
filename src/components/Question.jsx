import React, { useState, useEffect } from 'react'

function Question({ question, number, nextQuestion, answered, setAnswered }) {
  const [answerIsCorrect, setAnswerIsCorrect] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [filteredAnswers, setFilteredAnswers] = useState(question.answers)
  const [optionLetters, setOptionLetters] = useState(["A", "B", "C", "D", "E"])
 console.log(question)
  useEffect(() => {
    setFilteredAnswers(question.answers)
    setSelectedAnswer(null)
    setAnswerIsCorrect(null)
  }, [question])
  console.log(filteredAnswers)
  function checkAnswer(answer) {
    setSelectedAnswer(answer)
    setAnswered(true)
    if (answer.correct) {
      setAnswerIsCorrect(true)
      setFilteredAnswers(filteredAnswers.filter((ans) => ans.correct));
    }
    else {
      setAnswerIsCorrect(false)
      setFilteredAnswers(filteredAnswers.filter((ans) => {
        return ans.correct || answer === ans
      }));
    }
  }

  console.log(selectedAnswer, answerIsCorrect)
  return (
    <>

      <section className='answers'>
        {filteredAnswers.map((answer, index) => (

          <div onClick={() => checkAnswer(answer)} className={selectedAnswer === null ? 'answer' : (answer.correct ? 'answer correct' : 'answer incorrect')}>
            <span>{optionLetters[index]}</span>
            <span>{answer.title}</span>
          </div>

        ))}
        {selectedAnswer && question.explanation &&
          <section className='explanation test'>
            <h4>Explanation</h4>
            <p>{question.explanation}</p>
            
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