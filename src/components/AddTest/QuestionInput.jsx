import React from 'react'
import Add from '../../assets/add.svg'
function QuestionInput(props) {
    return (
        <div className='form-input'>
            
            {props.isLast &&
                <img className='icon add' src={Add} alt='add a new question'></img>
            }

            <span className='collapseButton'>
                {props.questionNumber}.
            </span>

            <input 
            className='input question' 
            value={props.value} 
            type="text" 
            name='title' 
            placeholder={props.placeholder}
            onChange={props.onChange}
            
            
            >
        
                
            </input>
            <span>?</span>
        </div>
    )
}

export default QuestionInput