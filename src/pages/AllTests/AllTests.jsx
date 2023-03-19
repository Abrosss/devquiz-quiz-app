import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom';
import axios from '../../api/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import Dots from '../../assets/dots.svg'
import './AllTests.css'
function AllTests() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpened, setMenuOpened] = useState(null)
  console.log(isAdmin)
  
  useEffect(() => {
    const token = Cookies.get('auth_token');
    console.log(token)
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.isAdmin);
    }
  }, []);
  useEffect(() => {
    async function getCategories() {
      const response = await axios.get('/categories')
      setCategories(response.data)
    }
    getCategories()
  }, [])
 
  function toggleMenu(index) {
    if (menuOpened === null) setMenuOpened(index)
    else setMenuOpened(null)
  }
  return (
   <>
      <Header/>
      <section className='container tests'>
      <h2>Tests</h2>
      <ul className='categories'>
        {categories.map((category, index) => (
         
         <li key={category._id} className='category'>
            <Link
              to={`/tests/${category.title.toLowerCase()}`}
              state={{ category: category}}>
             {category.title} 
            </Link>
            {isAdmin &&
            <>
             <div onClick={() => toggleMenu(index) } className='settings'><img className='icon' src={Dots}></img></div>
             {menuOpened === index &&
             <ul className='settingsPopup'>
             <li><Link
              to={`/tests/edit/${category._id}`}>
             Edit
            </Link></li>
            </ul>
             }
             
             </>
            }
           
            
            
            </li> 
        ))}
      </ul>
      </section>
      <Footer position={"fixed"}/>
   </>
  )
}

export default AllTests