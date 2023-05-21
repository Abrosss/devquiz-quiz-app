import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Header from '../Header'
import axios from '../../api/axios'

function Categories() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(categories)
    useEffect(() => {
        async function init() {
            setIsLoading(true)
            const response = await axios.get('/categories')
            setCategories(response.data)
            setIsLoading(false)
        }
        init()
    }, [])
    return (
        <>
            <Header />
            <section className='container'>
                <section className='categories-container'>
                    {categories &&
                        categories.map(category => (
                            <div className='category'>{category.title}</div>
                        ))
                    }

                </section>


            </section>



        </>
    )
}

export default Categories