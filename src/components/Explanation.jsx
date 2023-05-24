import React from 'react'
function indented(text) {
    return text.split(';')
}
function Explanation({ explanation }) {
    return (
        <section className='explanation test'>
            <h4>Explanation</h4>
            <div className='explanation-text'>{indented(explanation).map(sentence => (
                <p>{sentence}</p>
            ))}</div>

        </section>
    )
}

export default Explanation