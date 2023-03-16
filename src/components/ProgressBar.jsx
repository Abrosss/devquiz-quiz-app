import React from 'react'

function ProgressBar({questions, currentQuestion}) {
  return (
    <section className='progress'>
    {questions.map((question, index) => (
      <div className={currentQuestion === index ? 'cell active' : 'cell'}>{index+1}</div>
    ))}

    </section>
  )
}

export default ProgressBar