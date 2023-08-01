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
function ProgressBar({ questions, currentQuestionIndex, func, isAdmin }) {

  function handleClick(index) {
    if(isAdmin) func(index)
    else return
  }
  return (
    <section className={isAdmin ? 'progress-bar-admin' : 'progress-bar'} >
      {questions.map((cell, index) => (
        <div onClick={() => handleClick(index)} key={index} data-testid='progress-bar-cell'
          className={colorCell(cell?.isCorrect, index, currentQuestionIndex)}>{index + 1}</div>
      ))}
    </section>
  );
}

export { ProgressBar, colorCell }