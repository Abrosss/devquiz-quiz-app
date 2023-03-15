import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer'
import Add from './assets/add.svg'
function AddTheme() {
  const [questions, setQuestions] = useState([{title:'', image: "", options: [{title:"", correct: false}, {title:"", correct: false}]}])
  const [questionsExpanded, setQuestionsExpanded] = useState([0])
  console.log(questionsExpanded)
  const addOption = (questionIndex) => {
   
    const updated = [...questions]
    updated[questionIndex].options.push({title:""})
    setQuestions(updated)
  };
  const handleImageUpload = (event, questionIndex) => {
    const uploadedImage = event.target.files[0];
    const updated = [...questions]
    updated[questionIndex].image=URL.createObjectURL(uploadedImage)
    setQuestions(updated)
  };
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
            <input className='input' type="text" placeholder="Add Category"></input>
          </div>

        </section>
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
             <section className='image-section'>
             {question.image &&
                        <img src={question.image}></img>
             }
  
            </section>
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
          <button>SUBMIT</button>
         

        </section>
      </section>
        <Footer/>
    </>
  )


}

export default AddTheme

// 
//           
           
          
//             