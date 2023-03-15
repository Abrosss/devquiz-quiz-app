import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer'
import Add from './assets/add.svg'
import axios from './api/axios';

import Delete from './assets/delete.svg'
import { Link } from 'react-router-dom';

function AddTheme() {
  const question = {
    title:'', 
    category: "", 
    image: "", 
    cloudinaryId: "",
    options: 
    [
      {title:"", correct: false}, 
      {title:"", correct: false}
    ]}
  const [category, setCategory] = useState(null)
  const [saved, setSaved] = useState(false)
  const [questions, setQuestions] = useState([question])
  const [questionsExpanded, setQuestionsExpanded] = useState([0])
  const [questionAdded, setQuestionAdded] = useState(false)
  console.log(questionAdded)
  const addOption = (questionIndex) => {
   
    const updated = [...questions]
    updated[questionIndex].options.push({title:""})
    setQuestions(updated)
  };
  const handleImageUpload = (e, index) =>{
    const file = e.target.files[0];
    setFileToBase(file, index);
    console.log(file);
}

 function setFileToBase (file, questionIndex){
    const reader = new FileReader();
    const updated = [...questions]
    reader.readAsDataURL(file);
    reader.onloadend = async () =>{
      console.log(reader.result)
      const response = await axios.post('/addImage', {"image" : reader.result} )
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
  
  function addQuestion(index) {
    setQuestions([...questions, {title:'', options: [{title:""}, {title:""}]}])
    console.log(index)
    const updated = [...questionsExpanded]
    if (updated.length > 0) {
      updated.pop()
    }
    setQuestionsExpanded([...updated, index+1])
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    list[index]["category"] = category;
    setQuestions(list); 
    console.log(questions)
  };
  const handleOptionChange = (e, index, questionIndex) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[questionIndex].options[index][name] = value;
    setQuestions(list); 
    console.log(questions)
  };
  const handleCorrectOption = (e, index, questionIndex) => {
    const { name } = e.target;
    const list = [...questions];
    if(e.target.checked) {
      list[questionIndex].options[index][name] = true
      list[questionIndex].options.forEach((option, optionIndex) => {
        if (optionIndex !== index) {
          option[name] = false;
        }})
    }
    setQuestions(list); 
  
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
async function addQuestions(e) {
  e.preventDefault()
  try {
      const response = await axios.post('/questions', {
          questions: questions
      });
      if (response.status === 200) {
        setQuestionAdded(true)
      }


  } catch (err) {

      console.error(err);
  }


}
  console.log(questions)
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
            <button onClick={(e) => addCategory(e)} className='save'>Save</button>
          </div>

        </section>
        {saved && !questionAdded &&
          <section className='container-content'>
          <h3>Add Questions</h3>
          {
            questions.map((question, index) => (
              <section className='sections'>
 <section className='question-section'>
              <div className='form-input'>
                {index === questions.length-1 &&
                 <img onClick={() => {
                  addQuestion(index)
                 }}  className='add' src={Add}></img>
                }
               
              <span className='collapseButton'  onClick={() => {
              if (questionsExpanded.includes(index)) {
                setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))
              } else {
                setQuestionsExpanded([...questionsExpanded, index]);
         
              }
            } }>
               {index+1}.
              </span>
              <input onChange={(e) => handleInputChange(e, index)} className='input question' value={question.title} type="text" name='title' placeholder="Type a question here"></input>
              <span>?</span>
            </div>
            {  questionsExpanded.includes(index) &&
            <>
            {question.image &&
             <section className='image-section'>
             
                        <img src={question.image}></img>
                        <img className='icon' onClick={() => deleteImage(index, question.cloudinaryId)} src={Delete}></img>
             
             
   
  
            </section>
            }
             <div class="upload">
             <input class="upload-input" id="file" type="file" onChange={(e) => handleImageUpload(e, index)}/>
               <div class="upload-list"></div>
            </div>
            </>
            }
           
           
            </section>
            {  questionsExpanded.includes(index) &&
            <div className='form-input options'>
          
             <div class="radio-item-container">
            {question.options.map((answer, optIndex) => (
               	<div class="radio-item">
                 <label for="vanilla">
                   <input  checked={answer.correct}   onChange={(e) => handleCorrectOption(e, optIndex, index)} type="radio" id="vanilla" name="correct" value="vanilla"/>
                   <textarea name='title' onChange={(e) => handleOptionChange(e,optIndex, index)} className='input option' value={answer.title} type="text" placeholder="Type an option here"></textarea>
                 </label>
               </div>
))}
	<span onClick={() => addOption(index)} className='addButton'>Add another option</span>

		
	</div>
            
              
           
              
            </div>
             }
              </section>
           
            ))
          }
          <button onClick={addQuestions}>SUBMIT</button>
         

        </section>
        }
        {questionAdded && 
        <section className='container-content'>
          <h2>Test Added!</h2>
          <Link className='button' to="/categories">BACK TO TESTS</Link>
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