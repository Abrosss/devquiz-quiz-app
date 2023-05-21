import React from 'react'
import Question from '../Question'
import axios from '../../api/axios'
function AddQuestions() {
    const emptyQuestion = {
        title: '',
        options:
            [
                { title: ""},
                { title: ""}
            ]
    }
    const [questions, setQuestions] = useState([emptyQuestion])
    const [questionsExpanded, setQuestionsExpanded] = useState([0])
   
    function addQuestion(index) {
       


            setQuestions([...questions, { title: '', options: [{ title: "" }, { title: "" }] }])

            const expanded = [...questionsExpanded]
            if (expanded.length > 0) {
                expanded.pop()
            }
            setQuestionsExpanded([...expanded, index + 1])

     
    



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
                        questionProps={question}
                        options={question.options}
                        isLast={index === questions.length - 1}
                    />

                ))
            }
            <button className='submit' onClick={submitQuestions}>SUBMIT</button>
        </>
    )
}

export default AddQuestions