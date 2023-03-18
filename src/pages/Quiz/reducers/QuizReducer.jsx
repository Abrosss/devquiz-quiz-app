export const initialState = {
    quizIsFinished: false,
    currentQuestionIndex: 0,
    correctAnswerCount: 0,
    quizResults: [],
    progressBarArray: []
  };
  
  export function quizStartReducer(state, action) {
    switch (action.type) {
      case 'START_QUIZ':
        return initialState;
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }