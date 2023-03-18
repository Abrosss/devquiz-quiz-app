import React from 'react';
import {render, screen, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import Loading from '../Loading';
import LoadingIcon from '../../assets/pulse.gif';
test('loading icon is working', () => {
  
  // Assert
  render(<Loading/>)
  const loadingImage = screen.getByTestId("loading")
  expect(loadingImage).toBeInTheDocument()
  expect(loadingImage).toHaveAttribute('src', LoadingIcon);
});
