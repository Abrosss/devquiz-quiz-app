import React from 'react'
import { useState } from 'react'
import QuestionInput from './QuestionInput'
import QuestionImage from './QuestionImage'
import UploadButton from './UploadButton'
import Option from './Option'
import axios from '../../api/axios'
function Question({ index, isLast, isExpanded, questions, addQuestion, setQuestions }) {
  const emptyQuestion = {
    title: '',
    options:
        [
            { title: "", correct: false},
            { title: "", correct: false }
        ]
}
const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const [question, setQuestion] = useState(emptyQuestion)


const recordQuestionInputs = (e) => {
  const { name, value } = e.target;
  const updatedQuestion = { ...question }
  updatedQuestion[name] = value;
  setQuestion(updatedQuestion)
};
const recordOptionsInputs = (e, index) => {
  const { name, value } = e.target;
  const updatedQuestion = { ...question };
  updatedQuestion.options[index][name] = value;
  updatedQuestion.options[index]["letter"] = optionLetters[index];
  setQuestion(updatedQuestion); 

};
const recordOptionCheck = (e, index) => {
  let { name } = e.target;
  name = name.split("-")[0]
  const updatedQuestion = { ...question }
  if(e.target.checked) {
    updatedQuestion.options[index][name] = true
    updatedQuestion.options.forEach((option, optionIndex) => {
      if (optionIndex !== index) {
        option[name] = false;
      }})
  }
  setQuestion(updatedQuestion); 

}
const addOption = () => {
  const updatedQuestion = { ...question };
  updatedQuestion.options.push({title:"", correct:false})
  setQuestion(updatedQuestion)
};
function setFileToBase (file){
  const reader = new FileReader();
  const updatedQuestion = { ...question };
  reader.readAsDataURL(file);
  reader.onloadend = async () =>{

    const response = await axios.post('/addImage', {"image" : reader.result} )
    updatedQuestion.image=response.data.url
    updatedQuestion.cloudinaryId=response.data.id
    setQuestion(updatedQuestion)
   
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
    setQuestions(prevArray => {
      const newArray = [...prevArray];
      newArray[index] = newValue;
      return newArray;
    });


  }


}
const handleImageUpload = (e) =>{
  const file = e.target.files[0];
  setFileToBase(file);

}
  return (
    <section className='sections'>
      <section className='question-section'>
        <QuestionInput
        index={index}
          placeholder="Type a question here"
          value={question.title}
          questionNumber={index + 1}
          isLast={isLast}
          onChange={recordQuestionInputs}
          addQuestion={addQuestion}
        />
        {isExpanded &&
          <>
            {question.image && <QuestionImage src={question.image} />}
            <UploadButton onChange={handleImageUpload} />
          </>
        }
      </section>
      {isExpanded &&
        <div className='form-input options'>
           <div class="radio-item-container">
            {question.options.map((answer, optIndex) => (
                <Option 
                placeholder={"Type an option here"} 
                index={optIndex}
                questionIndex={index} 
                checked={answer.correct}
                value={answer.title}
                onChange={recordOptionsInputs}
                onCheck={recordOptionCheck}
                />
            ))}
         
            <span className='addButton' onClick={addOption}>Add another option</span>


        </div>
         
          <section className='explanation'>
            <h5>Explanation</h5>
            <textarea name='explanation' onChange={(e) => recordQuestionInputs(e, index)}></textarea>
          </section>



        </div>
      }
    </section>


  )
}

export default Question