import React, { useEffect, useState } from 'react'
import Header from './components/Header';
import Add from './assets/add.svg'
function AddTheme() {
  const [questions, setQuestions] = useState([{title:'', options: [{title:""}, {title:""}]}])

  const addOption = (questionIndex) => {
    const updated = [...questions]
    updated[questionIndex].options.push({title:"feef"})
    setQuestions(updated)
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
                 <img onClick={() => setQuestions([...questions, {title:'', options: [{title:""}, {title:""}]}])} className='add' src={Add}></img>
                }
               
              <span>
               {index+1}.
              </span>
              <input className='input question' type="text" placeholder="Type here"></input>
              <span>?</span>
            </div>
            <section className='image-section'>
              <img src='https://courses.cs.washington.edu/courses/cse341/03au/slides/Paradigms/img004.GIF'></img>
             </section>
            <div class="upload">
 <input class="upload-input" id="file" type="file" onChange={(e) => console.log(e.target.files[0].size)}/>
   <div class="upload-list"></div>
</div>
            </section>
            <div className='form-input options'>
          
             <div class="radio-item-container">
            {question.options.map(answer => (
               	<div class="radio-item">
                 <label for="vanilla">
                   <input type="radio" id="vanilla" name="flavor" value="vanilla"/>
                   <textarea className='input option' type="text" placeholder="Type here"></textarea>
                 </label>
               </div>
))}
	<span onClick={() => addOption(index)} className='addButton'>Add another option</span>

		
	</div>
            
              
           
              
            </div>
              </section>
             
            ))
          }
         

        </section>
      </section>

    </>
  )


}

export default AddTheme

// 
//           
           
          
//             