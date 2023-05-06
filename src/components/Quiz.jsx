import React from 'react'
import { useState, useEffect } from 'react';
import Question from './Question';
import Answer from './Answer';
function Quiz({ questions, currentQuestionIndex, userResults, setUserResults, setQuizState, updateProgressBar }) {
    const [visibleAnswers, setVisibleAnswers] = useState(questions[currentQuestionIndex].answers)
    //RESET ANSWERS WHEN A QUESTION IS CHANGED

    useEffect(() => {

      
        setVisibleAnswers(questions[currentQuestionIndex]?.answers)

    }, [currentQuestionIndex])
    function filterAnswers(selectedAnswer, allAnswers) {
        if (selectedAnswer.correct) {
            return [selectedAnswer];
        }
        else {
            return allAnswers.filter(answer => answer.title === selectedAnswer.title || answer.correct);
        }
    }
    function saveUserResults(question, correctAnswer, selectedAnswer) {
     
        setUserResults(prevResults => {
            const newResults = [...prevResults];
            newResults[currentQuestionIndex] = { ...newResults[currentQuestionIndex], question: question, correctAnswer: correctAnswer, selectedAnswer: selectedAnswer };
            return newResults;
        });
    }
    
    function checkAnswer(answer) {
        const answerSelected = userResults[currentQuestionIndex].selectedAnswer !== null;
        if (!answerSelected) {
            let correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct)
            saveUserResults(questions[currentQuestionIndex], correctAnswer, answer)
            updateProgressBar(answer, currentQuestionIndex)
            const answersToDisplay = filterAnswers(answer, questions[currentQuestionIndex].answers)
            setVisibleAnswers(answersToDisplay)
            if (answer.correct) {
                setQuizState(prevState => ({
                    ...prevState,
                    correctAnswerCount: prevState.correctAnswerCount + 1
                }));

            }

        }
    }
    function wrapString(string) {
        return string.split(';')
    }
    function nextQuestion() {
        if (currentQuestionIndex === questions.length - 1) {
            setQuizState(prevState => ({
                ...prevState,
                quizIsFinished: true
            }));
        }
        else {
            setQuizState(prevState => ({
                ...prevState,
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }));
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
                <Answer
                    answers={visibleAnswers}
                    checkAnswer={checkAnswer}
                    selectedAnswer={userResults[currentQuestionIndex].selectedAnswer}

                />

                {userResults[currentQuestionIndex].selectedAnswer && questions[currentQuestionIndex].explanation &&
                    <section className='explanation test'>
                        <h4>Explanation</h4>
                        <div className='explanation-text'>{wrapString(questions[currentQuestionIndex].explanation).map(sentence => (
                            <p>{sentence}</p>
                        ))}</div>

                    </section>
                }
                {userResults[currentQuestionIndex].selectedAnswer &&
                    <button data-testid='next-question-button' onClick={nextQuestion}>{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}</button>
                }


            </section>


        </section>
    )
}

export default Quiz