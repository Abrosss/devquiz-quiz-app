import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Quiz } from '../../components/Quiz'
import '@testing-library/jest-dom/extend-expect';

describe('Quiz', () => {
  const questions = [
    { id: 1, title: 'Question 1', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: 'Explanation' },
    { id: 2, title: 'Question 2', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: 'Explanation' },
    { id: 3, title: 'Question 3', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: 'Explanation' },
    { id: 4, title: 'Question 4', answers: [{ title: '' }, { title: '' }, { title: '' }], explanation: 'Explanation' },
  ];

  it('the amount of questions is equal to progress bar cells', () => {

    const { getAllByTestId } = render(<Quiz questions={questions} />);
    const cells = getAllByTestId('progress-bar-cell');
    expect(cells).toHaveLength(questions.length);

  });
  it('next question functionality', () => {

    const { getByTestId, queryByTestId } = render(<Quiz questions={questions}/>);
    const answers = [
      getByTestId('answer-0'),
      getByTestId('answer-1'),
      getByTestId('answer-2'),
    ]
    const questionTitle = getByTestId('question-title').textContent;
    const hiddenButton = queryByTestId('next-question');

    expect(hiddenButton).toBeNull(); 

    answers.forEach((answer, index) => {
      fireEvent.click(answer);
      const nextQuestion = queryByTestId('next-question');
     
      expect(nextQuestion).toBeInTheDocument()
      fireEvent.click(nextQuestion);
      const updatedQuestionTitle = getByTestId('question-title').textContent;
      expect(updatedQuestionTitle).not.toBe(questionTitle);
      const isLastQuestion = index === questions.length - 1;
      const expectedButtonText = isLastQuestion ? 'Finish' : 'Next Question';
        expect(nextQuestion).toHaveTextContent(expectedButtonText);
      
    });

 ; 
  });
  it('explanation appears after a user chooses an answer', () => {
    const { getByTestId, queryByTestId } = render(<Quiz questions={questions} />);
    const answers = [
      getByTestId('answer-0'),
      getByTestId('answer-1'),
      getByTestId('answer-2'),
    ];
  
    const explanation = queryByTestId('explanation');
    expect(explanation).toBeNull();
  
    answers.forEach((answer) => {
      fireEvent.click(answer);
      const updatedExplanation = queryByTestId('explanation');
  
      expect(updatedExplanation).toBeTruthy();
    });
  });

  
});
