import React from 'react'

function Option({index, answer, questionIndex, handleOptionChange, handleCorrectOption, placeholder}) {
    return (
        <div class="radio-item">
            <label for={index}>
                <input checked={answer.correct} onChange={(e) => handleCorrectOption(e, index, questionIndex)} type="radio" id={index} name={`correct-${questionIndex}`} value="vanilla" />
                <textarea name='title' onChange={(e) => handleOptionChange(e, index, questionIndex)} className='input option' value={answer.title} type="text" placeholder={placeholder}></textarea>
            </label>
        </div>
    )
}

export default Option