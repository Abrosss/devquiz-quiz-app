import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Add from '../../assets/add.svg'
import Cookies from 'js-cookie';
import Delete from '../../assets/delete.svg'
import { Link } from 'react-router-dom';
function EditTest() {
    const { testId } = useParams()
    const [category, setCategory] = useState(null)
    const [questions, setQuestions] = useState([])
    const [updatedQuestions, setUpdatedQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    console.log(questions, category)
    useEffect(() => {
        async function getQuestions() {
          setIsLoading(true)
          const response = await axios.get(`/questions/${testId}`)
          setQuestions(response.data)
          setUpdatedQuestions(response.data)
    
          setIsLoading(false)
        }
        async function getCategory() {
          setIsLoading(true)
          const response = await axios.get(`/categories/${testId}`)
          setCategory(response.data[0])
    
    
          setIsLoading(false)
        }
        getQuestions()
        getCategory()
      }, [])
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

      const [questionsExpanded, setQuestionsExpanded] = useState([0])
      const [questionAdded, setQuestionAdded] = useState(false)
      const [error, setError] = useState(null)
      const [loggedIn, setLoggedIn] = useState(false);
    
        useEffect(() => {
          const authToken = Cookies.get('auth_token');
          console.log(authToken)
          if (authToken) {
            setLoggedIn(true)
         
          } else {
            setLoggedIn(false)
            navigate('/login');
          }
        }, []);
      console.log(questionAdded)
      const addOption = (questionIndex) => {
       
        const updated = [...updatedQuestions]
        updated[questionIndex].answers.push({title:""})
        setUpdatedQuestions(updated)
      };
      const handleImageUpload = (e, index) =>{
        const file = e.target.files[0];
        setFileToBase(file, index);
        console.log(file);
    }
    
     function setFileToBase (file, questionIndex){
        const reader = new FileReader();
        const updated = [...updatedQuestions]
        reader.readAsDataURL(file);
        reader.onloadend = async () =>{
          console.log(reader.result)
          const response = await axios.post('/addImage', {"image" : reader.result} )
          updated[questionIndex].image=response.data.url
          updated[questionIndex].cloudinaryId=response.data.id
          setUpdatedQuestions(updated)
         
        }
    
    }
    async function deleteImage(index, id) {
      const updated = [...updatedQuestions]
      try {
        const response = await axios.post('/deleteImage', {
            id: id
        });
        if (response.status === 200) {
          updated[index].image=""
          updated[index].cloudinaryId=""
          setUpdatedQuestions(updated)
        }
    
    
    } catch (err) {
    
        console.error(err);
    }
    }
      
      function addQuestion(index) {
        let err = checkValidation(updatedQuestions[index])
    
        if(Object.keys(err).length === 0) {
          setUpdatedQuestions([...updatedQuestions, {title:'', new:true, answers: [{title:""}, {title:""}]}])
        
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
        const list = [...updatedQuestions];
        list[index][name] = value;
        list[index]["category"] = category;
      
        setUpdatedQuestions(list); 
    
      };
    console.log(updatedQuestions)
      const handleOptionChange = (e, index, questionIndex) => {
        const { name, value } = e.target;
        const list = [...updatedQuestions];
        list[questionIndex].answers[index][name] = value;
        list[questionIndex].answers[index]["letter"] = optionLetters[index];
        setUpdatedQuestions(list); 
      
      };
      const handleCorrectOption = (e, index, questionIndex) => {
        let { name } = e.target;
        name = name.split("-")[0]
        const list = [...updatedQuestions];
        if(e.target.checked) {
          list[questionIndex].answers[index][name] = true
          list[questionIndex].answers.forEach((option, optionIndex) => {
            if (optionIndex !== index) {
              option[name] = false;
            }})
        }
        setUpdatedQuestions(list); 
      
      }
      console.log(questions)
      async function addCategory(e) {
        e.preventDefault()
        try {
            const response = await axios.post('/addCategory', {
                category: category
            });
            if (response.status === 200) {

              setCategory(response.data) //id
            }
    
    
        } catch (err) {
    
            console.error(err);
        }
    
    
    }
    async function addQuestions(questions) {
      try {
          const response = await axios.post('/questions', {
              questions: questions
          });
          if (response.status === 200) {
            setQuestionAdded(true)
          }
    
    
      } catch (err) {
    
          console.error(err);
      }
    
    
    }
    async function editQuestions(e) {
      e.preventDefault()
      const newQuestions = updatedQuestions.filter(que => que.new)
      const updatedQuestions2 = updatedQuestions.filter(que => !que.new)
      if(newQuestions) {
        addQuestions(newQuestions)
      }
      try {
          const response = await axios.put('/questions', {
              questions: updatedQuestions2
          });
          if (response.status === 200) {
            setQuestionAdded(true)
          }
    
    
      } catch (err) {
    
          console.error(err);
      }
    
    
    }
    function checkValidation(question) {
      console.log(question)
      let errors = {}
      let answers = question.answers.filter(answer => answer.correct === false);
      if(question.answers.length === answers.length) {
       errors.optionError= 'set a correct answer'
      }
      if(question.title === "") {
        errors.questionError= 'what is the question?'
       }
       return errors
    }
    
      console.log(questions)
      return (
        <>
          <Header />
          <section className='container'>
            <section className='container-header'>
              <h1>Edit Test</h1>
              <div className='form-input'>
                <span>
                  Category
                </span>
                <input onChange={(e) => setCategory(e.target.value)} className='input' type="text" placeholder="Add Category" value={category?.title}></input>
                <button onClick={(e) => addCategory(e)} className='save'>Save</button>
              </div>
    
            </section>
            {!questionAdded &&
              <section className='container-content'>
              <h3>Add Questions</h3>
              {
                updatedQuestions.map((question, index) => (
                  <section className='sections'>
     <section className='question-section'>
                  <div className='form-input'>
                    {index === updatedQuestions.length-1 &&
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
                {question.answers.map((answer, optIndex) => (
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
              <button className='submit' onClick={editQuestions}>SUBMIT</button>
             
    
            </section>
            }
            {questionAdded && 
            <section className='container-content'>
              <h2>Test Added!</h2>
              <Link className='button' to="/">BACK TO TESTS</Link>
            </section>
            }
          </section>
            <Footer />
        </>
      )
    
    
    }


export default EditTest