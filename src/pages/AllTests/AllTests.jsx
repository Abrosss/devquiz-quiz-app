import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom';
import axios from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Cookies from 'js-cookie';
function AllTests() {
  const navigate = useNavigate();
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
      <section className='container tests'>
      <h2>Tests</h2>
      <ul className='categories'>
        {categories.map(category => (
         
         <li key={category._id} className='category'>
            <Link
              to={`/tests/${category.title.toLowerCase()}`}
              state={{ category: category}}>
             {category.title} 
            </Link>
          
            
            
            </li> 
        ))}
      </ul>
      </section>
      <Footer position={"fixed"}/>
   </>
  )
}

export default AllTests