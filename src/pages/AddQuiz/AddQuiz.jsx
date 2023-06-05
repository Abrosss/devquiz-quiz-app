import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Options from '../../components/Admin/Options';
import Add from '../../assets/add.svg';
import Delete from '../../assets/delete.svg';
import { deleteFromArray, recordInputs, addToArray, uploadToCloudinary, deleteFromCloudinary } from '../../helpFunctions';

import './AddQuiz.css';

function AddQuiz() {

  const defaultQuestion = () => {
    return {
      title: '',
      options:
          [
              { title: "" },
              { title: "" }
          ]
    }
    }
  const [quiz, setQuiz] = useState({})
  const [saved, setSaved] = useState(false)
const [questions, setQuestions] = useState([defaultQuestion()])
const [questionsExpanded, setQuestionsExpanded] = useState([0])

function handleQuestionToggle(index) {
  if (questionsExpanded.includes(index)) {
    setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))

  } else {
    setQuestionsExpanded([...questionsExpanded, index]);

  }
}
function handleQuestionInputs(e, index) {
  setQuestions(recordInputs(e, questions, index ))
}
function handleDeleteQuestion(index) {
  setQuestions(deleteFromArray(questions, index))
}
async function handleImageUpload (e, index) {
  const updatedArray = [...questions]
  const file = e.target.files[0];
  try {
    const imageData =  await uploadToCloudinary(file)
    updatedArray[index].image = imageData.url
    updatedArray[index].cloudinaryId = imageData.id
    console.log(updatedArray)
    setQuestions(updatedArray)

  } catch (error) {
    console.error(error);
  }
}


 


async function handleImageDelete(index, cloudinaryId) {
const updatedArray = [...questions]
const deleted = await deleteFromCloudinary(cloudinaryId)
if (deleted) {
  updatedArray[index].image = ""
  updatedArray[index].cloudinaryId = ""
  setQuestions(updatedArray)
}
}
function addEmptyQuestion(index) {
        setQuestions(addToArray(questions, defaultQuestion())) ////add a new question
        const expanded = [...questionsExpanded]
        if (expanded.length > 0) {
            expanded.pop()
        }
        setQuestionsExpanded([...expanded, index + 1])
}
function handleSubmit(e) {
e.preventDefault()
if(quiz.title) submitQuiz(quiz.title)
  //submit quiz, if successful, submit questions for it

}
async function submitQuestions(quizID) {

    try {
        const response = await axios.post(`/questions`, {
            questions: questions,
            quizID: quizID
        })
        if (response.status === 200) {
          setSaved(true)
        }
    } catch (err) {
        console.error(err);
    }
}
 
async function submitQuiz(title) {
    try {
        const response = await axios.post('/addQuiz', {
            title: title
        });
        if (response.status === 200) {
          submitQuestions(response.data) //response.data is the quiz ID
        }


    } catch (err) {

        console.error(err);
    }


}


  return (
    <>
      <Header link ='/admin/tests'/>
      { saved ? 
  <section className='container-content'>
  <h2>Quiz Added!</h2>
  <Link className='button' to="/admin/tests">BACK TO QUIZZES</Link>
</section>
:

        <>
         <section className='container'>
        <section className='container-header'>
          <h1>Add New Quiz</h1>
          <div className='form-input'>
            <span>
              Title
            </span>
            <input onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} className='input' type="text" placeholder="Add a Quiz Title"></input>
          </div>

        </section>
  
        <>
    
     
        <section className='container-content'>
        <h3>Add Questions</h3>
            {
                questions.map((question, index) => (
                  <section className='question-section-admin '>
                  <section className='question'>
                  <section className='question-section'>
                  <div className='form-input'>
            
            {index === questions.length - 1 &&
                <img className='icon add' src={Add} alt='add a new question' onClick={() => addEmptyQuestion(index)}></img>
            }
             <img className='icon' onClick={() => handleDeleteQuestion(index)} src={Delete}></img>
            <span className='collapseButton' onClick={() => handleQuestionToggle(index)}>
                {index + 1}.
            </span>

            <input 
            className='input question' 
            value={question.title} 
            type="text" 
            name='title' 
            placeholder="Type a question here"
            onChange={(e) => handleQuestionInputs(e, index)}
            
            
            >
        
                
            </input>
            <span>?</span>
        </div>
                  
                    {questionsExpanded.includes(index) &&
                      <>
                        {question.image && 
                         <section className='image-section'>

                         <img src={question.image} alt='question illustration'></img>
                         <img className='icon' alt='delete an image' src={Delete} onClick={() => handleImageDelete(index, question.cloudinaryId)}></img>
                 
                       </section>
                        
                        }
                        <div class="upload">
            <input class="upload-input" id="file" type="file" onChange={(e) => handleImageUpload(e, index)}/>
            <div class="upload-list"></div>
        </div>
                      </>
                    }
                  </section>
                  {questionsExpanded.includes(index) &&
                    <div className='form-input options'>

                      <Options 
                      options={question.options} 
                      questionIndex={index} 
                      questions={questions} 
                      setQuestions={setQuestions}/>
                     
                      <section className='explanation'>
                        <h5>Explanation</h5>
                        <textarea name='explanation' onChange={(e) => handleQuestionInputs(e, index)}></textarea>
                      </section>
            
        
                    </div>
                  }
                </section>
                </section>

                ))
            }
            <button className='submit' onClick={(e) => handleSubmit(e)}>SUBMIT</button>
        </section>
        </>
        </section>
        </>
      }
     
          
        
        
  
        <Footer position={saved ? '' : 'fixed'}/>
    </>
  )


}

export default AddQuiz

