import React from 'react'
function indented(text) {
    return text.split(';')
}
function Explanation({ explanation }) {
    return (
        <section className='explanation test'  data-testid='explanation'>
            <h4>Explanation</h4>
            <div className='explanation-text'>{indented(explanation).map((sentence, index) => (
                <p key={index}>{sentence}</p>
            ))}</div>

        </section>
    )
}

export default Explanation