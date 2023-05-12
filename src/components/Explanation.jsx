import React from 'react'
function wrapString(string) {
    return string.split(';')
}
function Explanation({ explanation }) {
    return (
        <section className='explanation test'>
            <h4>Explanation</h4>
            <div className='explanation-text'>{wrapString(explanation).map(sentence => (
                <p>{sentence}</p>
            ))}</div>

        </section>
    )
}

export default Explanation