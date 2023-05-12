import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Add from '../../assets/add.svg'
import axios from '../../api/axios';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Delete from '../../assets/delete.svg'
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './AddTheme.css'
function AddTheme() {
  const navigate = useNavigate();
  const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const question = {
    title:'', 
    category: "", 
    image: "", 
    cloudinaryId: "",
    explanation: "",
    letter: "",
    options: 
    [
      {title:"", correct: false, letter: "A"}, 
      {title:"", correct: false, letter: "B"}
    ]}
  const [category, setCategory] = useState(null)
  const [saved, setSaved] = useState(false)
  const [questions, setQuestions] = useState([question])
  const [questionsExpanded, setQuestionsExpanded] = useState([0])
  const [questionAdded, setQuestionAdded] = useState(false)
  const [error, setError] = useState(null)
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

  const addOption = (questionIndex) => {
   
    const updated = [...questions]
    updated[questionIndex].options.push({title:""})
    setQuestions(updated)
  };
  const handleImageUpload = (e, index) =>{
    const file = e.target.files[0];
    setFileToBase(file, index);

}

 function setFileToBase (file, questionIndex){
    const reader = new FileReader();
    const updated = [...questions]
    reader.readAsDataURL(file);
    reader.onloadend = async () =>{

      const response = await axios.post('/addImage', {"image" : reader.result} )
      updated[questionIndex].image=response.data.url
      updated[questionIndex].cloudinaryId=response.data.id
      setQuestions(updated)
     
    }

}
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
  
  function addQuestion(index) {
    let err = checkValidation(questions[index])

    if(Object.keys(err).length === 0) {
      setQuestions([...questions, {title:'', options: [{title:""}, {title:""}]}])
    
      const updated = [...questionsExpanded]
      if (updated.length > 0) {
        updated.pop()
      }
      setQuestionsExpanded([...updated, index+1])
    
    }
    else {
      setError(err)
    }
   
     
    
   
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[index][name] = value;
    list[index]["category"] = category;
  
    setQuestions(list); 

  };

  const handleOptionChange = (e, index, questionIndex) => {
    const { name, value } = e.target;
    const list = [...questions];
    list[questionIndex].options[index][name] = value;
    list[questionIndex].options[index]["letter"] = optionLetters[index];
    setQuestions(list); 

  };
  const handleCorrectOption = (e, index, questionIndex) => {
    let { name } = e.target;
    name = name.split("-")[0]
    const list = [...questions];
    if(e.target.checked) {
      list[questionIndex].options[index][name] = true
      list[questionIndex].options.forEach((option, optionIndex) => {
        if (optionIndex !== index) {
          option[name] = false;
        }})
    }
    setQuestions(list); 
  
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
async function addQuestions(e) {
  e.preventDefault()

  try {
    const [response1, response2] = await Axios.all([
      Axios.post(`http://localhost:5000/api/questions`, {
        questions: questions
      }), 
      Axios.put(`http://localhost:5000/api/categories/${category}`, {
        tips: tips
      })
    ]);

    

    if (response1.status === 200 && response2.status === 200) {
      setQuestionAdded(true);
    }

  } catch (err) {
    console.error(err);
  }
}

function checkValidation(question) {
  let errors = {}
  let options = question.options.filter(answer => answer.correct === false);
  if(question.options.length === options.length) {
   errors.optionError= 'set a correct answer'
  }
  if(question.title === "") {
    errors.questionError= 'what is the question?'
   }
   return errors
}


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
          <h3>Add Questions</h3>
          {
            questions.map((question, index) => (
              <section className='sections'>
 <section className='question-section'>
              <div className='form-input'>
                {index === questions.length-1 &&
                 <img onClick={() => {
                  addQuestion(index)
                 }}  className='add' src={Add}></img>
                }
               
              <span className='collapseButton'  onClick={() => {
              if (questionsExpanded.includes(index)) {
                setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))
              } else {
                setQuestionsExpanded([...questionsExpanded, index]);
         
              }
            } }>
               {index+1}.
              </span>
              <input onChange={(e) => handleInputChange(e, index)} className='input question' value={question.title} type="text" name='title' placeholder="Type a question here"></input>
              <span>?</span>
            </div>
            {error && 
  <span className='error'>{error.questionError}</span>
}
            {  questionsExpanded.includes(index) &&
            <>
            {question.image &&
             <section className='image-section'>
             
                        <img src={question.image}></img>
                        <img className='icon' onClick={() => deleteImage(index, question.cloudinaryId)} src={Delete}></img>
             
             
   
  
            </section>
            }
             <div class="upload">
             <input class="upload-input" id="file" type="file" onChange={(e) => handleImageUpload(e, index)}/>
               <div class="upload-list"></div>
            </div>
        
            </>
            }
           
           
            </section>
            {  questionsExpanded.includes(index) &&
            <div className='form-input options'>
          
             <div class="radio-item-container">
            {question.options.map((answer, optIndex) => (
               	<div class="radio-item">
                 <label for={optIndex}>
                   <input  checked={answer.correct}   onChange={(e) => handleCorrectOption(e, optIndex, index)} type="radio" id={optIndex} name={`correct-${index}`} value="vanilla"/>
                   <textarea name='title' onChange={(e) => handleOptionChange(e,optIndex, index)} className='input option' value={answer.title} type="text" placeholder="Type an option here"></textarea>
                 </label>
               </div>
))}
{error && 
  <span className='error'>{error.optionError}</span>
}
	<span onClick={() => addOption(index)} className='addButton'>Add another option</span>

		
	</div>
  <section className='explanation'>
              <h5>Explanation</h5>
              <textarea name='explanation' onChange={(e) => handleInputChange(e, index)}></textarea>
            </section>

           
              
            </div>
             }
              </section>
           
            ))
          }
          <button className='submit' onClick={addQuestions}>SUBMIT</button>
         

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