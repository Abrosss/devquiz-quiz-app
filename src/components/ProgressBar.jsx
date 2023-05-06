import React from 'react';

function ProgressBar({ progressTracking, currentQuestionIndex }) {
  console.log(progressTracking)
  return (
    <section className='progress'>
      {progressTracking.map((cell, index) => (
        <div key={index} 
        className={currentQuestionIndex === index ? 'cell active' : 
        (cell.isCorrect ? "cell correctCell" : 
        (cell.isCorrect === null ? "cell" : "cell incorrectCell"))}>{index+1}</div>
      ))}
    </section>
  );
}

export default ProgressBar;