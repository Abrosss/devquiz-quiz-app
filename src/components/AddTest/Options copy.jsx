import React from 'react'
import Option from './Option'
function Options({question, index, questions, setQuestions, error}) {
    const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const addOption = (questionIndex) => {
   
        const updated = [...questions]
        updated[questionIndex].options.push({title:""})
        setQuestions(updated)
      };
      const handleOptionChange = (e, index, questionIndex) => {
        const { name, value } = e.target;
        const list = [...questions];
        list[questionIndex].options[index][name] = value;
        list[questionIndex].options[index]["letter"] = optionLetters[index];
        setQuestions(list); 
    
      };
      const handleCorrectOption = (e, index, questionIndex) => {
      
        let { name } = e.target;
        name = name.split("-")[0]
        const list = [...questions];
        if(e.target.checked) {
          list[questionIndex].options[index][name] = true
          list[questionIndex].options.forEach((option, optionIndex) => {
            if (optionIndex !== index) {
              option[name] = false;
            }})
        }
        console.log(list)
        setQuestions(list); 
      
      }
    return (
        <div class="radio-item-container">
            {question.options.map((answer, optIndex) => (
                <Option 
                placeholder={"Type an option here"} questionIndex={index} answer={answer} index={optIndex} handleOptionChange={handleOptionChange} handleCorrectOption={handleCorrectOption} />
            ))}
            {error &&
                <span className='error'>{error.optionError}</span>
            }
            <span onClick={() => addOption(index)} className='addButton'>Add another option</span>


        </div>
    )
}

export default Options