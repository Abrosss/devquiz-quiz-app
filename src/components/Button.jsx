import React from 'react'

function Button({ func, name }) {
    return (
        <button
            data-testid='next-question'
            onClick={func}>
            {name}
        </button>
    )
}

export default Button