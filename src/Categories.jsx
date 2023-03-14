import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from './api/axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Dots from './assets/dots.svg'
function Categories() {

  const [categories, setCategories] = useState([])
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
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
         
         <li key={category._id} className='category'>
            <Link
              to={`/tests/${category.title.toLowerCase()}`}
              state={{ category: category}}>
             {category.title} 
            </Link>
            <img onClick={toggleMenu} className='icon settings' src={Dots}></img> 
            {showMenu &&
            <ul className='settingsMenu'>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
            }
            
            </li> 
        ))}
      </ul>
      </section>
      <Footer position={"fixed"}/>
   </>
  )
}

export default Categories