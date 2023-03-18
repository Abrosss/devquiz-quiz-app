import React from 'react';
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import filterAnswers from '../filterAnswers';
describe('filterAnswers', () => {
    const allAnswers = [
        { title: 'Answer 1', correct: false },
        { title: 'Answer 2', correct: false },
        { title: 'Answer 3', correct: true }
    ];
    test('filter answers correctly if the selected answer is incorrect', () => {
        const selectedAnswer = { title: 'Answer 1', correct: false }

        const expectedAnswers = [
            { title: 'Answer 1', correct: false },
            { title: 'Answer 3', correct: true },
        ];
        const filteredAnswers = filterAnswers(selectedAnswer, allAnswers);
        expect(filteredAnswers).toEqual(expectedAnswers);
    });
    test('filter answers correctly if the selected answer is correct', () => {
        const selectedAnswer = { title: 'Answer 3', correct: true }

        const expectedAnswers = [
            { title: 'Answer 3', correct: true },
        ];
        const filteredAnswers = filterAnswers(selectedAnswer, allAnswers);
        expect(filteredAnswers).toEqual(expectedAnswers);
    });
});
