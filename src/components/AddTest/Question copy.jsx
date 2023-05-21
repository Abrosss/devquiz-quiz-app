import React from 'react'
import Options from './Options'
import Add from '../../assets/add.svg'
function Question({index, question, isLast, addQuestion, questionsExpanded }) {
  return (
    <section className='sections'>
    <section className='question-section'>
                 <div className='form-input'>
                   {isLast &&
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
               {/* {error && 
     <span className='error'>{error.questionError}</span>
   } */}
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
             
                <Options question={question} index={index} questions={questions} setQuestions={setQuestions} error={error}/>
     <section className='explanation'>
                 <h5>Explanation</h5>
                 <textarea name='explanation' onChange={(e) => handleInputChange(e, index)}></textarea>
               </section>
   
              
                 
               </div>
                }
                 </section>
  )
}

export default Question