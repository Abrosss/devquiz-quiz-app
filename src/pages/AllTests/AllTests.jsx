import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from '../../api/axios';
import ButtonRedirect from '../../components/ButtonRedirect';
import Loading from '../../components/Loading';
import Dots from '../../assets/dots.svg'
import { UserContext } from '../../context/User'
import './AllTests.css'
import Cookies from 'js-cookie';
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
function AllTests() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState(categoriesData)
  const [menuOpened, setMenuOpened] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const authToken = Cookies.get('auth_token');

    if (authToken) {
      setLoggedIn(true)

    } 
  }, []);
  useEffect(() => {
    async function getQuizzes() {
      setIsLoading(true)
      const response = await axios.get('/quizzes')
  
      
      setQuizzes(response.data)
      setIsLoading(false)
    }
    getQuizzes()
  }, [])

  function toggleMenu(index) {
    if (menuOpened === null) setMenuOpened(index)
    else setMenuOpened(null)
  }
  return (
    <>
      <Header link='/' loggedIn={loggedIn} />
      <section className='container tests'>
        {loggedIn &&

          <div className='container-right'>
            <ButtonRedirect link="/admin/tests/addTest" name="Add a test" />
          </div>
        }

        <h2>Tests</h2>
        {isLoading ?
          <section className='container-content'>
            <Loading />
          </section>

          :

          <ul className='categories'>
            {quizzes.map((quiz, index) => (

              <li key={quiz._id} className='category'>
                <Link
                  to={loggedIn ? `/admin/tests/${quiz._id}` : `/tests/${quiz._id}`}
                >
                  {quiz.title}
                </Link>


              </li>
            ))}
          </ul>
        }

      </section>
      <Footer position={"fixed"} />
    </>
  )
}

export default AllTests