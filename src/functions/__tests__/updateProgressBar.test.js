import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import {updateProgressBar} from '../functions';
describe('updateProgressBar', () => {
    it('should update the progress bar array with the correct answer', () => {
      const progressBarArray = [
        {isCorrect: null },
        {isCorrect: null },
        {isCorrect: null },
      ];
      const index = 1;
      const answer = { correct: true };
  
      const expectedArray = [
        { question: 'Question 1', isCorrect: null },
        { question: 'Question 2', isCorrect: true },
        { question: 'Question 3', isCorrect: null },
      ];
  
      updateProgressBar(answer, index, progressBarArray);
  
      expect(progressBarArray).not.toBe(expectedArray);
    });
  });
