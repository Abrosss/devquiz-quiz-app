import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {Quiz} from '../../components/Quiz'


describe('Quiz', () => {
    it('should increment currentQuestionIndex and update quizIsFinished correctly when clicking "Next Question"', () => {
      const questions = [
        {
          id: "001002",
          title: "Programmingafa",
          image: "",
          explanation: "explanationssesgesg",
          category: "001001",
          answers: [
            {
              title: "answer1",
              correct: true,
              letter: 'A'
            },
            {
              title: "answer2",
              correct: false,
              letter: 'B'
            }
          ]
        },
        {
          id: "001003",
          title: "Programmingafa",
          image: "",
          explanation: "explanationssesgesg",
          category: "001001",
          answers: [
            {
              title: "answer1",
              correct: true,
              letter: 'A'
            },
            {
              title: "answer2",
              correct: false,
              letter: 'B'
            }
          ]
        },
        {
          id: "001004",
          title: "Programmingafa",
          image: "",
          explanation: "explanationssesgesg",
          category: "001001",
          answers: [
            {
              title: "answer1",
              correct: true,
              letter: 'A'
            },
            {
              title: "answer2",
              correct: false,
              letter: 'B'
            }
          ]
        }
      ]
  
      // Render the Quiz component
      const { getByText } = render(<Quiz questions={questions} />);
  
      // Click the "Next Question" button
      fireEvent.click(getByText('Next Question'));
  
      // Assert that currentQuestionIndex is incremented correctly
      expect(getByText('Question 2')).toBeInTheDocument();
  
      // Click the "Next Question" button again
      fireEvent.click(getByText('Next Question'));
  
      // Assert that currentQuestionIndex is incremented correctly again
      expect(getByText('Question 3')).toBeInTheDocument();
  
      // Click the "Next Question" button for the last question
      fireEvent.click(getByText('Next Question'));
  
      // Assert that quizIsFinished is updated correctly
      expect(getByText('Quiz Finished')).toBeInTheDocument();
    });
  });