export function filterAnswers(selectedAnswer, allAnswers) {
  if (selectedAnswer.correct) {
    return [selectedAnswer];
  }
  else {
    return allAnswers.filter(answer => answer.title === selectedAnswer.title || answer.correct);
  }
}


export const updateProgressBar = (answer, index, progressBarArray) => {
  if (answer) {
    const updatedArray = [...progressBarArray];
    updatedArray[index].isCorrect = answer?.correct;
 
    return updatedArray;
  }
  return progressBarArray;
};