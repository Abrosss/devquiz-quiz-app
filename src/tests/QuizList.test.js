import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuizList from '../components/QuizList'
import { BrowserRouter as Router } from 'react-router-dom';
describe('Quizzes are displayed', () => {
  it('renders quizzes and matches array length', () => {
    const quizzes = [
      { _id: '1', title: 'Quiz 1' },
      { _id: '2', title: 'Quiz 2' },
      // Add more quiz objects as needed
    ];
    
    const { container, getAllByTestId } = render(
        <Router>
          <QuizList quizzes={quizzes} isAdmin={false} />
        </Router>
      );

    const renderedQuizItems = getAllByTestId('quiz');
    const quizList = container.querySelector('.categories');

    expect(renderedQuizItems.length).toBe(quizzes.length);
    expect(quizList).toBeInTheDocument();
  });
});
