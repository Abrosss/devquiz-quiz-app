import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { ProgressBar, colorCell } from '../ProgressBar';

test('renders the correct number of progress bar cells', () => {
    const progressTracking = [
      { isCorrect: true },
      { isCorrect: null },
      { isCorrect: null },
    ];
    const currentQuestionIndex = 1;
  
    const { queryAllByTestId } = render(
      <ProgressBar
        progressTracking={progressTracking}
        currentQuestionIndex={currentQuestionIndex}
      />
    );
  
    const progressBarCells = queryAllByTestId('progress-bar-cell');
    expect(progressBarCells).toHaveLength(progressTracking.length);
  });
describe('colors the cells correctly', () => {
  const cell1 = true;
  const cell2 = false;
  const cell3 = null;

  it('if the cell is active', () => {
    expect(colorCell(cell1, 0, 0)).toBe('cell active');
  });
  it('if the cell is correct', () => {
    expect(colorCell(cell1, 0, 1)).toBe('cell correctCell');
  });
  it('if the cell is incorrect', () => {
    expect(colorCell(cell2, 1, 2)).toBe('cell incorrectCell');
  });
  it('if the cell is empty', () => {
    expect(colorCell(cell3, 2, 1)).toBe('cell');
  });

});
