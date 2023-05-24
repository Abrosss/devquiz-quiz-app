import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from '../../api/axios';
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
  const [quizzes, setQuizzes] = useState(categoriesData)
  const [menuOpened, setMenuOpened] = useState(null)

  useEffect(() => {
    async function getQuizzes() {
      const response = await axios.get('/quizzes')
      console.log(response)
      setQuizzes(response.data)
    }
    getQuizzes()
  }, [])
  console.log(isAdmin)

  function toggleMenu(index) {
    if (menuOpened === null) setMenuOpened(index)
    else setMenuOpened(null)
  }
  return (
    <>
      <Header link='/'/>
      <section className='container tests'>
        <div className='container-right'>
          <button> <Link
                to={'/admin/tests/addTest'}
              >
                Add a test
              </Link>
              </button>
        </div>
        
        <h2>Tests</h2>
        <ul className='categories'>
          {quizzes.map((quiz, index) => (

            <li key={quiz._id} className='category'>
              <Link
                to={isAdmin ? `/admin/tests/${quiz._id}` : `/tests/${quiz._id}`}
              >
                {quiz.title}
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