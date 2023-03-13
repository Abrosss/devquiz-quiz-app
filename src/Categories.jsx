import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from './api/axios';
function Categories() {

  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    async function getCategories() {
      const response = await axios.get('/categories')
      setCategories(response.data)
    }
    getCategories()
  }, [])
 
  return (
    <div className='container'>
      <header></header>
      <h2>Programming Tests</h2>
      <ul className='categories'>
        {categories.map(category => (
          <li key={category._id} className='category'>
            <Link
              to={`/tests/${category.title.toLowerCase()}`}
              state={{ categoryId: category._id }}>
              {category.title}
            </Link>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories