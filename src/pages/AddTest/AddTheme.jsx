import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer'

import axios from '../../api/axios';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Add from '../../assets/add.svg'
import Delete from '../../assets/delete.svg'

import Options from '../../components/Admin/Options';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

import './AddTheme.css'
function AddTheme() {
  const navigate = useNavigate();
  
 
  const [category, setCategory] = useState(null)
  const [saved, setSaved] = useState(false)
 

  const [questionAdded, setQuestionAdded] = useState(false)

  const [tips, setTips] = useState(null)

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

function collapseQuestion(index) {
    if (questionsExpanded.includes(index)) {
        setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))

    } else {
        setQuestionsExpanded([...questionsExpanded, index]);

    }
}
function deleteQuestion(id) {

  const filteredQuestions = updatedQuestions.filter(question => question.id !== id)
  console.log(filteredQuestions)
  setUpdatedQuestions(filteredQuestions)
 }









const recordQuestionInputs = (e, questionIndex) => {
  const { name, value } = e.target;
  const updatedQuestions = [ ...questions ]
  updatedQuestions[questionIndex][name] = value;
  setQuestions(updatedQuestions)
};



function setFileToBase (file, questionIndex){
  const reader = new FileReader();
  const updatedQuestions =[ ...questions ];
  reader.readAsDataURL(file);
  reader.onloadend = async () =>{

    const response = await axios.post('/addImage', {"image" : reader.result} )
    updatedQuestions[questionIndex].image=response.data.url
    updatedQuestions[questionIndex].cloudinaryId=response.data.id
    setQuestions(updatedQuestions)
   
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




function addQuestion(question, index) {
    let errors = checkValidation(question)  //check if the question title was added 
    if (Object.keys(errors).length === 0) {
        setQuestions([...questions, emptyQuestion]) ////add a new question

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
   


  const handleImageUpload = (e, index) =>{
    const file = e.target.files[0];
    setFileToBase(file, index);

}

 function setFileToBase (file, questionIndex){
    const reader = new FileReader();
    const updated = [...questions]
    reader.readAsDataURL(file);
    reader.onloadend = async () =>{

      const response = await axios.post('/addImage', {"image" : reader.result} )
      console.log(response)
      updated[questionIndex].image=response.data.url
      updated[questionIndex].cloudinaryId=response.data.id
      setQuestions(updated)
     
    }

}
async function deleteImage(index, id) {
  const updated = [...questions]
  try {
    const response = await axios.post('/deleteImage', {
        id: id
    });
    if (response.status === 200) {
      updated[index].image=""
      updated[index].cloudinaryId=""
      setQuestions(updated)
    }


} catch (err) {

    console.error(err);
}
}
  



  

  async function addCategory(e) {
    e.preventDefault()
    try {
        const response = await axios.post('/addCategory', {
            category: category
        });
        if (response.status === 200) {
           setSaved(true)
          setCategory(response.data) //id
        }


    } catch (err) {

        console.error(err);
    }


}

const handleEditorChange = (content, editor) => {
  // update state with new content
  setTips(content);
};





  return (
    <>
      <Header />
      <section className='container'>
        <section className='container-header'>
          <h1>Add New Test</h1>
          <div className='form-input'>
            <span>
              Category
            </span>
            <input onChange={(e) => setCategory(e.target.value)} className='input' type="text" placeholder="Add Category"></input>
          </div>

        </section>
  
        <>
    
     
        <section className='container-content'>
        <h3>Add Questions</h3>
            {
                questions.map((question, index) => (
                  <section className='question'>
                  <section className='question-section'>
                  <div className='form-input'>
            
            {index === questions.length - 1 &&
                <img className='icon add' src={Add} alt='add a new question' onClick={() => addQuestion(question, index)}></img>
            }
             <img className='icon' onClick={() => deleteQuestion(question.id)} src={Delete}></img>
            <span className='collapseButton' onClick={() => collapseQuestion(index)}>
                {index + 1}.
            </span>

            <input 
            className='input question' 
            value={question.title} 
            type="text" 
            name='title' 
            placeholder="Type a question here"
            onChange={(e) => recordQuestionInputs(e, index)}
            
            
            >
        
                
            </input>
            <span>?</span>
        </div>
                  
                    {questionsExpanded.includes(index) &&
                      <>
                        {question.image && 
                         <section className='image-section'>

                         <img src={question.image} alt='question illustration'></img>
                         <img className='icon' alt='delete an image' src={Delete} onClick={() => deleteImage(index, question.cloudinaryId)}></img>
                 
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
                        <textarea name='explanation' onChange={(e) => recordQuestionInputs(e, index)}></textarea>
                      </section>
            
        
                    </div>
                  }
                </section>

                ))
            }
            <button className='submit' onClick={submitQuestions}>SUBMIT</button>
        </section>
        </>
          
        
        {questionAdded && 
        <section className='container-content'>
          <h2>Test Added!</h2>
          <Link className='button' to="/">BACK TO TESTS</Link>
        </section>
        }
      </section>
        <Footer position={saved ? '' : 'fixed'}/>
    </>
  )


}

export default AddTheme

// 
//           
           
          
//             