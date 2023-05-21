import React from 'react'

function Option(props) {
    return (
        <div class="radio-item">
            <label for={props.index}>
                <input checked={props.checked} type="radio" id={props.index} name={`correct-${props.questionIndex}`} onChange={(e) => props.onCheck(e, props.index)} value={props.checked} />
                <textarea name='title' className='input option' value={props.value} type="text" placeholder={props.placeholder} onChange={(e) => props.onChange(e, props.index)}></textarea>
            </label>
        </div>
    )
}

export default Option