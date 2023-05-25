import React from 'react'

function Options({ options, questionIndex, questions, setQuestions }) {
  const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options.push({ title: "", correct: false })
    setQuestions(updatedQuestions)
  };
  const recordOptionCheck = (e, index, questionIndex) => {
    let { name } = e.target;
    name = name.split("-")[0]
    const updatedQuestions = [...questions]
    if (e.target.checked) {
      updatedQuestions[questionIndex].options[index][name] = true
      updatedQuestions[questionIndex].options.forEach((option, optionIndex) => {
        if (optionIndex !== index) {
          option[name] = false;
        }
      })
    }
    setQuestions(updatedQuestions);

  }
  const recordOptionsInputs = (e, index, questionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[index][name] = value;
    updatedQuestions[questionIndex].options[index]["letter"] = optionLetters[index];
    console.log(updatedQuestions)
    setQuestions(updatedQuestions);

  };
  return (
    <div class="radio-item-container">
      {options.map((answer, optIndex) => (
        <div class="radio-item">
          <label for={optIndex}>
            <input checked={answer.correct} type="radio" id={optIndex} name={`correct-${questionIndex}`} onChange={(e) => recordOptionCheck(e, optIndex, questionIndex)} value={answer.correct} />
            <textarea name='title' className='input option' value={answer.title} type="text" placeholder="Type an option here" onChange={(e) => recordOptionsInputs(e, optIndex, questionIndex)}></textarea>
          </label>
        </div>

      ))}

      <span className='addButton' onClick={() => addOption(questionIndex)}>Add another option</span>


    </div>
  )
}

export default Options