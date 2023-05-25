import React from 'react'
import { Link } from 'react-router-dom'
function ButtonRedirect({ link, name }) {
    return (
        <button>
            <Link
                to={link}
            >
                {name}
            </Link>
        </button>
    )
}

export default ButtonRedirect