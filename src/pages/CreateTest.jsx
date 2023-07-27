
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

import PDFContent from '../components/PDFContent';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
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
  const [questions, setQuestions] = useState([defaultQuestion()])
  const [showPreview, setShowPreview] = useState(false)
  const [questionsExpanded, setQuestionsExpanded] = useState([0])
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
  }
  function validatedAnswers(array) {
    const correctSelected = array.some(answer => answer.correct)
    const titlesAdded = array.every(answer => answer.title !== "")
    return correctSelected && array.length >= 2 && titlesAdded ? true : false
  }

  function addEmptyQuestion(index) {

      setQuestions(addToArray(questions, defaultQuestion())) ////add a new question
      const expanded = [...questionsExpanded]
      if (expanded.length > 0) {
        expanded.pop()
      }
      setQuestionsExpanded([...expanded, index])
    

  }



  function previewToggle() {
    setShowPreview(!showPreview)
  }

  const headerButton = {
    text: showPreview ? "Back" : "Preview",
    onClick: previewToggle,
  };

  return (
    <section className='page'>
      <Header page="createTest" link='/admin/tests' headerButton={headerButton} />


      {showPreview ?
        <div className='container-new'>
          <Navigation
            currentPage={quiz.quizTitle}
            linkToText=""
            linkTo=""
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
                {questions.length === 0 ?

                  <img className='icon add-new' src={Add} alt='add a new question' onClick={() => addEmptyQuestion(questions.length === 0 ? 0 : index)}></img>

                  :

                  questions.map((question, index) => (
                    <>
                      {questionsExpanded.includes(index) ?
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
                            {!questionsExpanded.includes(index) && <img className='icon deleteButton right' onClick={() => handleDeleteQuestion(index)} src={Delete}></img>}

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
                        </section> :

                        <section
                          className="question-section-collapsed">
                          <span
                            className="question-section-collapsed__title"
                            onClick={() => handleQuestionToggle(index)}>{question.title}</span>

                          <img className='icon deleteButton right'
                            onClick={() => handleDeleteQuestion(index)} src={Delete}></img>

                        </section>

                      }

                      {isLastQuestion(index) &&
                        <img className='icon add-new' src={Add} alt='add a new question' onClick={() => addEmptyQuestion(index+1)}></img>
                      }
                    </>
                  ))

                }




                <button>SHARE</button>
                <button className="pdf-button">
                  <PDFDownloadLink document={<PDFContent data={quiz} />} fileName={quiz.quizTitle + '.pdf'}>
                    {({ blob, url, loading, error }) =>
                      loading ? 'Loading document...' : 'Save as PDF'
                    }
                  </PDFDownloadLink>
                </button>




              </section>
            </>

            <div>
              {/* Your React component rendering */}
              {/* <PDFViewer width="1000" height="600">
        <PDFContent data={quiz} />
      </PDFViewer> */}

            </div>
          </section>
        </>


      }





      <Footer position="" />
    </section>
  )

}

export default CreateTest