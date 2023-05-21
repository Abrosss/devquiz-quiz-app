import React from 'react';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import Quiz from '../Quiz';

test('loading icon is working', () => {
  
  // Assert
  render(<Loading/>)
  const loadingImage = screen.getByTestId("loading")
  expect(loadingImage).toBeInTheDocument()
  expect(loadingImage).toHaveAttribute('src', LoadingIcon);
});
