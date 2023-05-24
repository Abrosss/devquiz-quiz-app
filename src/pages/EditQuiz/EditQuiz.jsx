import React, { useState, useEffect } from 'react'
import axios from '../../api/axios'
import Add from '../../assets/add.svg'
import Delete from '../../assets/delete.svg'
import { Link } from 'react-router-dom';
import { uploadToCloudinary } from '../../helpFunctions';
function EditQuiz({ questions, quizData }) {
  const [quiz, setQuiz] = useState(quizData)
  const [updatedQuestions, setUpdatedQuestions] = useState(questions)
  const [isLoading, setIsLoading] = useState(true)

  const question = {
    title: '',
    category: "",
    image: "",
    cloudinaryId: "",
    explanation: "",
    letter: "",
    options:
      [
        { title: "", correct: false, letter: "A" },
        { title: "", correct: false, letter: "B" }
      ]
  }

  const [questionsExpanded, setQuestionsExpanded] = useState([])
  const [questionAdded, setQuestionAdded] = useState(false)




  const addOption = (questionIndex) => {

    const updated = [...updatedQuestions]
    updated[questionIndex].answers.push({ title: "" })
    setUpdatedQuestions(updated)
  };
  async function handleImageUpload (e, index) {
    const updatedArray = [...updatedQuestions]
    const file = e.target.files[0];
    try {
      const imageData =  await uploadToCloudinary(file)
      updatedArray[index].image = imageData.url
      updatedArray[index].cloudinaryId = imageData.id
      console.log(updatedArray)
      setUpdatedQuestions(updatedArray)
  
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteImage(index, id) {
    const updated = [...updatedQuestions]
    try {
      const response = await axios.post('/deleteImage', {
        id: id
      });
      if (response.status === 200) {
        updated[index].image = ""
        updated[index].cloudinaryId = ""
        setUpdatedQuestions(updated)
      }


    } catch (err) {

      console.error(err);
    }
  }

  function addQuestion(index) {
    let err = checkValidation(updatedQuestions[index])

    if (Object.keys(err).length === 0) {
      setUpdatedQuestions([...updatedQuestions, { title: '', new: true, answers: [{ title: "" }, { title: "" }] }])

      const updated = [...questionsExpanded]
      if (updated.length > 0) {
        updated.pop()
      }
      setQuestionsExpanded([...updated, index + 1])

    }
    else {
      setError(err)
    }




  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;

    setUpdatedQuestions(updatedQuestions);

  };

  const handleOptionChange = (e, index, questionIndex) => {
    const optionLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
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
    if (e.target.checked) {
      list[questionIndex].answers[index][name] = true
      list[questionIndex].answers.forEach((option, optionIndex) => {
        if (optionIndex !== index) {
          option[name] = false;
        }
      })
    }
    setUpdatedQuestions(list);

  }

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
    if (newQuestions) {
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
    if (question.answers.length === answers.length) {
      errors.optionError = 'set a correct answer'
    }
    if (question.title === "") {
      errors.questionError = 'what is the question?'
    }
    return errors
  }

  function collapse(index) {
    if (questionsExpanded.includes(index)) {
      setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))
    } else {
      setQuestionsExpanded([...questionsExpanded, index]);

    }
  }

  function deleteQuestion(id) {

    const filteredQuestions = updatedQuestions.filter(question => question.id !== id)
    console.log(filteredQuestions)
    setUpdatedQuestions(filteredQuestions)
  }
  return (
    <>



      <section className='container-content'>
        <h1>Edit {quiz?.title}</h1>
        <h3>{updatedQuestions.length} questions</h3>
        {
          updatedQuestions.map((question, index) => (
            <section className='question'>
              <section>
                <div className='form-input'>

                  {index === updatedQuestions.length - 1 &&
                    <img onClick={() => {
                      addQuestion(index)
                    }} className='add icon' src={Add} alt='add a question icon'></img>
                  }
                  <img className='icon' onClick={() => deleteQuestion(question.id)} src={Delete}></img>

                  <span className='collapseButton' onClick={() => collapse(index)}>
                    {index + 1}.
                  </span>

                  <input
                    onChange={(e) => handleInputChange(e, index)}
                    className='input question'
                    value={question.title}
                    type="text"
                    name='title'
                    placeholder="Type a question here"></input>
                  <span>?</span>
                </div>

                {questionsExpanded.includes(index) &&
                  <>
                    {question.image &&
                      <section className='image-section'>

                        <img src={question.image} alt='question illustration'></img>
                        <img className='icon' onClick={() => deleteImage(index, question.cloudinaryId)} src={Delete}></img>

                      </section>
                    }
                    <div class="upload">
                      <input class="upload-input" id="file" type="file" onChange={(e) => handleImageUpload(e, index)} />
                      <div class="upload-list"></div>
                    </div>

                  </>
                }


              </section>
              {questionsExpanded.includes(index) &&
                <div className='form-input options'>

                  <div class="radio-item-container">
                    {question.answers.map((answer, optIndex) => (
                      <div class="radio-item">
                        <label for={optIndex}>
                          <input checked={answer.correct} onChange={(e) => handleCorrectOption(e, optIndex, index)} type="radio" id={optIndex} name={`correct-${index}`} value="vanilla" />
                          <textarea name='title' onChange={(e) => handleOptionChange(e, optIndex, index)} className='input option' value={answer.title} type="text" placeholder="Type an option here"></textarea>
                        </label>
                      </div>
                    ))}

                    <span onClick={() => addOption(index)} className='addButton'>Add another option</span>


                  </div>
                  <section className='explanation'>
                    <h5>Explanation</h5>
                    <textarea value={question.explanation} name='explanation' onChange={(e) => handleInputChange(e, index)}></textarea>
                  </section>



                </div>
              }
            </section>

          ))
        }
        <section className='flex gap-1'>
        <button className='submit attention' >DELETE THIS TEST</button>
        <button className='submit' onClick={editQuestions}>SUBMIT</button>
        </section>
       


      </section>

      {questionAdded &&
        <section className='container-content'>
          <h2>Test Added!</h2>
          <Link className='button' to="/">BACK TO TESTS</Link>
        </section>
      }


    </>
  )


}


export default EditQuiz