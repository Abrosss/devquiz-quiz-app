import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer'

import axios from '../../api/axios';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Delete from '../../assets/delete.svg'
import AddQuestions from '../../components/AddTest/AddQuestions';

import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

import './AddTheme.css'
function AddTheme() {
  const navigate = useNavigate();
  
 
  const [category, setCategory] = useState(null)
  const [saved, setSaved] = useState(false)
 

  const [questionAdded, setQuestionAdded] = useState(false)

  const [tips, setTips] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      const authToken = Cookies.get('auth_token');
  
      if (authToken) {
        setLoggedIn(true)
     
      } else {
        setLoggedIn(false)
        navigate('/login');
      }
    }, []);


  


async function deleteImage(index, id) {
  const updated = [...questions]
  try {
    const response = await axios.post('/deleteImage', {
        id: id
    });
    if (response.status === 200) {
      updated[index].image=""
      updated[index].cloudinaryId=""
      setQuestions(updated)
    }


} catch (err) {

    console.error(err);
}
}
  



  

  async function addCategory(e) {
    e.preventDefault()
    try {
        const response = await axios.post('/addCategory', {
            category: category
        });
        if (response.status === 200) {
           setSaved(true)
          setCategory(response.data) //id
        }


    } catch (err) {

        console.error(err);
    }


}

const handleEditorChange = (content, editor) => {
  // update state with new content
  setTips(content);
};





  return (
    <>
      <Header />
      <section className='container'>
        <section className='container-header'>
          <h1>Add New Test</h1>
          <div className='form-input'>
            <span>
              Category
            </span>
            <input onChange={(e) => setCategory(e.target.value)} className='input' type="text" placeholder="Add Category"></input>
            <button onClick={(e) => addCategory(e)} className='save'>Save</button>
          </div>

        </section>
        {saved && !questionAdded &&
        <>
        {/* <section className='container-content container-tips'>
          <h3>Add Tips</h3>
          <p>If there are tips or hints you want to add, please go ahead</p>
          <Editor
  apiKey=""
  initialValue="<p></p>"
  init={{
    height: 300,
    width:'100%',
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic | fontsize | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent '
  }}
  onChange={(content, editor) => {
   setTips(content.level.content)
  }}
/>

         

        </section> */}
        <section className='container-content'>
          <AddQuestions/>
        </section>
        </>
          
        }
        {questionAdded && 
        <section className='container-content'>
          <h2>Test Added!</h2>
          <Link className='button' to="/">BACK TO TESTS</Link>
        </section>
        }
      </section>
        <Footer position={saved ? '' : 'fixed'}/>
    </>
  )


}

export default AddTheme

// 
//           
           
          
//             