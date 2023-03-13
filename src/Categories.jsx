import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from './api/axios';
import Header from './components/Header';
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
   <>
      <Header/>
      <section className='content'>
      <h2>Tests</h2>
      <ul className='categories'>
        {categories.map(category => (
         
            <Link
              to={`/tests/${category.title.toLowerCase()}`}
              state={{ category: category}}>
              <li key={category._id} className='category'>{category.title}</li> 
            </Link>

       
        ))}
      </ul>
      </section>
      
   </>
  )
}

export default Categories