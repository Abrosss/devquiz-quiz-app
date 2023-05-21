import React from 'react'
import Question from './Question'
import axios from '../../api/axios'
import { useState } from 'react'
function AddQuestions() {
    const emptyQuestion = {
        title: '',
        options:
            [
                { title: "" },
                { title: "" }
            ]
    }
    const [questions, setQuestions] = useState([emptyQuestion])
    const [questionsExpanded, setQuestionsExpanded] = useState([0])
    const [error, setError] = useState(null)
console.log(questions)
    function collapseQuestion(index) {
        if (questionsExpanded.includes(index)) {
            setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))

        } else {
            setQuestionsExpanded([...questionsExpanded, index]);

        }
    }

   












    function addQuestion(question, index) {
        let errors = checkValidation(question)  //check if the question title was added 
        if (Object.keys(errors).length === 0) {
            setQuestions([...questions, question]) ////add a new question

            const expanded = [...questionsExpanded]

            if (expanded.length > 0) {
                expanded.pop()
            }
            setQuestionsExpanded([...expanded, index + 1])

        }


    }
    function checkValidation(question) {
        let errors = {}
        let options = question.options.filter(answer => answer.correct === false);
        if (question.options.length === options.length) {
            errors.optionError = 'set a correct answer'
        }
        if (question.title === "") {
            errors.questionError = 'what is the question?'
        }
        return errors
    }
    async function submitQuestions(e) {
        e.preventDefault()

        try {
            const response = await axios.post(`/questions`, {
                questions: questions
            })

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <h3>Add Questions</h3>
            {
                questions.map((question, index) => (
                    <Question
                        index={index}
                        question={question}
                        options={question.options}
                        isLast={index === questions.length - 1}
                        addQuestion={addQuestion}
                        questionsExpanded={questionsExpanded}
                        collapseQuestion={collapseQuestion}
                        isExpanded={questionsExpanded.includes(index)}
                        questions={questions}
                        setQuestions={setQuestions}
                    />

                ))
            }
            <button className='submit' onClick={submitQuestions}>SUBMIT</button>
        </>
    )
}

export default AddQuestions