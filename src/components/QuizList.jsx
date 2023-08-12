import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
function QuizList({quizzes, isAdmin}) {
    console.log(isAdmin)
  return (
    <ul className='categories'>
    {quizzes.map((quiz, index) => (

      <li key={quiz._id} className='category' data-testid='quiz'>
        <Link
          to={isAdmin ? `/admin/tests/${quiz._id}` : `/tests/${quiz._id}`}
        >
          {quiz.title}
        </Link>


      </li>
    ))}
  </ul>
  )
}

export default QuizList