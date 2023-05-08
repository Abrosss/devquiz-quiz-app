import React from 'react';
function colorCell(isCorrect, index, currentQuestionIndex) {
  if (currentQuestionIndex === index) {
    return "cell active";
  } else if (isCorrect === true) {
    return "cell correctCell";
  } else if (isCorrect === false) {
    return "cell incorrectCell";
  } else {
    return "cell";
  }
}
function ProgressBar({ progressTracking, currentQuestionIndex }) {
  return (
    <section className='progress' >
      {progressTracking.map((cell, index) => (
        <div key={index} data-testid='progress-bar-cell'
          className={colorCell(cell?.isCorrect, index, currentQuestionIndex)}>{index + 1}</div>
      ))}
    </section>
  );
}

export { ProgressBar, colorCell }