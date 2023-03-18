export default function filterAnswers(selectedAnswer, allAnswers) {
    return allAnswers.filter(answer => answer.title === selectedAnswer.title || answer.correct);
  }