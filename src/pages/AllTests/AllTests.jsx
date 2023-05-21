import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Dots from '../../assets/dots.svg'
import './AllTests.css'

let categoriesData = [
  {
    id: "001001",
    title: "Programming",
    hash: "programming"
  },
  {
    id: "001002",
    title: "Programming Tules",
    hash: "programming_tules"
  }
]
function AllTests({ isAdmin }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(categoriesData)
  const [menuOpened, setMenuOpened] = useState(null)


  console.log(isAdmin)

  function toggleMenu(index) {
    if (menuOpened === null) setMenuOpened(index)
    else setMenuOpened(null)
  }
  return (
    <>
      <Header />
      <section className='container tests'>
        <div className='container-right'>
          <button> <Link
                to={'/admin/addTest'}
              >
                Add a test
              </Link>
              </button>
        </div>
        
        <h2>Tests</h2>
        <ul className='categories'>
          {categories.map((category, index) => (

            <li key={category._id} className='category'>
              <Link
                to={isAdmin ? `/admin/tests/${category.hash}` : `/tests/${category.hash}`}
              >
                {category.title}
              </Link>
          

            </li>
          ))}
        </ul>
      </section>
      <Footer position={"fixed"} />
    </>
  )
}

export default AllTests