import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Quiz } from '../../components/Quiz'
import '@testing-library/jest-dom/extend-expect';

describe('Quiz', () => {
  const questions = [
    { id: 1, text: 'Question 1', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: '' },
    { id: 2, text: 'Question 2', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: '' },
    { id: 3, text: 'Question 3', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: '' },
    { id: 4, text: 'Question 4', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: '' },
  ];

  it('all questions are rendered in the progress bar', () => {

    const { getAllByTestId } = render(<Quiz questions={questions} />);
    const cells = getAllByTestId('progress-bar-cell');
    expect(cells).toHaveLength(questions.length);

  });
  it('next question button appears after a user chooses an answer', () => {

    const { getByTestId, queryByTestId } = render(<Quiz questions={questions}/>);
    const initialButtons = [
      getByTestId('answer-0'),
      getByTestId('answer-1'),
      getByTestId('answer-2'),
    ]

    const hiddenButton = queryByTestId('next-question');

    expect(hiddenButton).toBeNull(); 

    initialButtons.forEach((initialButton) => {
      fireEvent.click(initialButton);
      const hiddenButton = queryByTestId('next-question');
      expect(hiddenButton).toBeInTheDocument()
    });

 ; 
  });


});