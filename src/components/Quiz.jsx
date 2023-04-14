import React from 'react'
import Question from './Question';
import Answers from './Answers';
function Quiz({questions, currentQuestionIndex, userResults, setUserResults}) {

    function recordAnswer(answer) {
        const answerSelected = userResults.selectedAnswer !== null;
        if (!answerSelected) {
            let correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct)

            setUserResults(...userResults, {question:questions[currentQuestionIndex], correctAnswer:correctAnswer, selectedAnswer: answer})

      
    
      }
    }
    return (
        <section className='quiz'>
            <Question
                currentQuestion={questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                amountOfQuestions={questions.length}
            />
            <section className='answers'>
                <Answers 
                answers={questions[currentQuestionIndex].answers}
                recordAnswer={recordAnswer}
                selectedAnswer={userResults[currentQuestionIndex].selectedAnswer}
            
                />




            </section>


        </section>
    )
}

export default Quiz