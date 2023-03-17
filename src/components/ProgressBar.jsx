import React from 'react';

function ProgressBar({ progressBarArray, currentQuestionIndex }) {
  return (
    <section className='progress'>
      {progressBarArray.map((point, index) => (
        <div className={currentQuestionIndex === index ? 'cell active' : (point.isCorrect ? "cell correctCell" : (point.isCorrect === null ? "cell" : "cell incorrectCell"))}>{index+1}</div>
      ))}
    </section>
  );
}

export default ProgressBar;