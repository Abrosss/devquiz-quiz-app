
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Options from '../components/Admin/Options';
import Add from '../assets/add.svg';
import Delete from '../assets/delete.svg';
import { Quizzy } from '../components/Quizzy'
import { deleteFromArray, recordInputs, addToArray, uploadToCloudinary, deleteFromCloudinary } from '../helpFunctions';
import Navigation from '../components/Navigation';


function CreateTest() {
  const defaultQuestion = () => {
    return {
      title: '',
      options:
        [
          { title: "" },
          { title: "" }
        ]
    }
  }
  const [quiz, setQuiz] = useState({})
  const [showPreview, setShowPreview] = useState(false)
  const [questionsExpanded, setQuestionsExpanded] = useState([0])
  console.log(showPreview)
  const [quizTitle, setQuizTitle] = useState('')
  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    if (quiz) {
      setQuiz(quiz)
      if (quiz.quizTitle) {
        setQuizTitle(quiz.quizTitle);
      }
      if (quiz.questions) {
        setQuestions(quiz.questions)
      }
      if (quiz.questionsExpanded) {
        setQuestionsExpanded(quiz.questionsExpanded)
      }
    }
   
  }, []);
  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const updatedTitle = {
      ...quiz,
      quizTitle,
    };
    localStorage.setItem("quiz", JSON.stringify(updatedTitle));
  }, [quizTitle]);

  const [saved, setSaved] = useState(false)
  const [questions, setQuestions] = useState([defaultQuestion()])
  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const updatedQuestions = {
      ...quiz,
      questions,
    };
    localStorage.setItem("quiz", JSON.stringify(updatedQuestions));

  }, [questions]);



  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const updatedQuiz = {
      ...quiz,
      questionsExpanded,
    };
    localStorage.setItem("quiz", JSON.stringify(updatedQuiz));

  }, [questionsExpanded]);


  function handleQuestionToggle(index) {
    if (questionsExpanded.includes(index)) {
      setQuestionsExpanded(questionsExpanded.filter((i) => i !== index))

    } else {
      setQuestionsExpanded([...questionsExpanded, index]);

    }
  }
  const isLastQuestion = (index) => {
    console.log(index === questions.length - 1 )
    return index === questions.length - 1 
  }
  function handleQuestionInputs(e, index) {
    setQuestions(recordInputs(e, questions, index))
  }
  function handleDeleteQuestion(index) {
    setQuestions(deleteFromArray(questions, index))
  }
  async function handleImageUpload(e, index) {
    const updatedArray = [...questions]
    const file = e.target.files[0];
    try {
      const imageData = await uploadToCloudinary(file)
      updatedArray[index].image = imageData.url
      updatedArray[index].cloudinaryId = imageData.id
      console.log(updatedArray)
      setQuestions(updatedArray)

    } catch (error) {
      console.error(error);
    }
  }





  async function handleImageDelete(index, cloudinaryId) {
    const updatedArray = [...questions]
    const deleted = await deleteFromCloudinary(cloudinaryId)
    if (deleted) {
      updatedArray[index].image = ""
      updatedArray[index].cloudinaryId = ""
      setQuestions(updatedArray)
    }
  } console.log(questions)
  function validatedAnswers(array) {
    const correctSelected = array.some(answer => answer.correct)
    const titlesAdded = array.every(answer => answer.title !== "")
    return correctSelected && array.length >= 2 && titlesAdded ? true : false
  }
  console.log(questions)
  function addEmptyQuestion(index) {
    console.log(questions[index].title)
    if (questions[index].title !== "") {
      setQuestions(addToArray(questions, defaultQuestion())) ////add a new question
      const expanded = [...questionsExpanded]
      if (expanded.length > 0) {
        expanded.pop()
      }
      setQuestionsExpanded([...expanded, index + 1])
    }

  }
  function handleSubmit(e) {
    e.preventDefault()
    const allAnswersFilled = questions.every(question => validatedAnswers(question.options))
    console.log(allAnswersFilled)
    if (quizTitle && allAnswersFilled) submitQuiz(quizTitle)
    //submit quiz, if successful, submit questions for it

  }
  async function submitQuestions(quizID) {

    try {
      const response = await axios.post(`/questions`, {
        questions: questions,
        quizID: quizID
      })
      if (response.status === 200) {
        setSaved(true)
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function submitQuiz(title) {
    try {
      const response = await axios.post('/addQuiz', {
        title: title
      });
      if (response.status === 200) {
        await submitQuestions(response.data) //response.data is the quiz ID
      }


    } catch (err) {

      console.error(err);
    }


  }

  function previewToggle() {
    setShowPreview(!showPreview)
  }

  const headerButton = {
    text: showPreview ? "Back" : "Preview",
    onClick: previewToggle,
  };
  console.log(questions)
  return (
   <section className='page'>
      <Header page="createTest" link='/admin/tests' headerButton={headerButton}  />
      {saved ?
        <section className='container-content-new'>
          <h2>Quiz Added!</h2>
          <Link className='button' to="/admin/tests">BACK TO QUIZZES</Link>
        </section>
        :

        showPreview ?
          <div className='container-new'>
             <Navigation
            currentPage={quiz.quizTitle}
            linkToText = ""
            linkTo =""
          />
            <Quizzy questions={questions} />
          </div>


          :

          <>
            <section className='container-new'>
              <section className='container-header-new'>
                <div className='form-input'>
                  <input
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className='input'
                    type="text"
                    placeholder="Add a Quiz Title"
                    value={quizTitle}></input>
                </div>

              </section>

              <>


                <section className='container-content-new'>
                  {
                    questions.map((question, index) => (
                      <>
                        <section
                          className={questionsExpanded.includes(index) ? "question-section-admin-new" : "question-section-admin-new collapsed"}>
                          {questionsExpanded.includes(index) &&

                            <div className='question-section-admin-new__header collapseButton' onClick={() => handleQuestionToggle(index)}>

                              <h3>Question {index + 1}</h3>

                             <img className='icon deleteButton right' onClick={() => handleDeleteQuestion(index)} src={Delete}></img> 
                            </div>

                          }


                          <div className={questionsExpanded.includes(index) ? "form-input" : "form-input collapsed"}>

                            <input
                              className={questionsExpanded.includes(index) ? "input question-section-admin-new__title" : "input question-section-admin-new__title collapsed"}
                              value={question.title}
                              type="text"
                              name='title'
                              placeholder="Type a question here"
                              onChange={(e) => handleQuestionInputs(e, index)}
                              onClick={() => { !questionsExpanded.includes(index) && handleQuestionToggle(index) }}

                            >


                            </input>
                            {!questionsExpanded.includes(index) && <img className='icon deleteButton right' onClick={() => handleDeleteQuestion(index)} src={Delete}></img> }
                            
                          </div>
                          {questionsExpanded.includes(index) &&
                            <div className='question-section-admin-new__content'>
                              <section className='question'>

                                <>
                                  {question.image &&
                                    <section className='image-section-new'>

                                      <img src={question.image} alt='question illustration'></img>
                                      <img className='icon' alt='delete an image' src={Delete} onClick={() => handleImageDelete(index, question.cloudinaryId)}></img>

                                    </section>

                                  }
                                  <div class="upload">
                                    <input class="upload-input" id="file" type="file" onChange={(e) => handleImageUpload(e, index)} />

                                    <div class="upload-list"></div>
                                  </div>
                                </>

                              </section>

                              <div className='form-input options-new'>

                                <Options
                                  options={question.options}
                                  questionIndex={index}
                                  questions={questions}
                                  setQuestions={setQuestions} />




                              </div>

                            </div>

                          }

                          {questionsExpanded.includes(index) &&
                            <section className='explanation-new'>
                              <h5>Explanation</h5>
                              <textarea name='explanation' value={question.explanation} onChange={(e) => handleQuestionInputs(e, index)}></textarea>
                            </section>
                          }
                        </section>
                        {isLastQuestion(index) &&
                          <img className='icon add-new' src={Add} alt='add a new question' onClick={() => addEmptyQuestion(index)}></img>
                        }
                      </>
                    ))
                  }


                  <button className='submit' onClick={(e) => handleSubmit(e)}>SUBMIT</button>



                </section>
              </>
            </section>
          </>


      }





      <Footer position="" />
   </section>
  )

}

export default CreateTest