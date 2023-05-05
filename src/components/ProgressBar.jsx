import React from 'react';

function ProgressBar({ questionsTracking, currentQuestionIndex }) {
  return (
    <section className='progress'>
      {questionsTracking.map((cell, index) => (
        <div key={index} 
        className={currentQuestionIndex === index ? 'cell active' : 
        (cell.selectedAnswer?.correct ? "cell correctCell" : 
        (cell.selectedAnswer === null ? "cell" : "cell incorrectCell"))}>{index+1}</div>
      ))}
    </section>
  );
}

export default ProgressBar;