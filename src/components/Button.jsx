import React from 'react'

function Button({ func, name }) {
    return (
        <button
            onClick={func}>
            {name}
        </button>
    )
}

export default Button