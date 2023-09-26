import React from 'react';
import { render, screen } from '@testing-library/react';
import Box from './Box';

describe('Box Component', () => {
  it('should render', () => {
    render(<Box></Box>);
    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();
  });

  it('should render box', () => {
    const { getByTestId } = render(<Box></Box>);
    // const box = screen.getByTestId("box");
    expect(getByTestId('box')).toBeInTheDocument();
  });

  it('should render any element passed in the as prop', () => {
    render(<Box as="h1"></Box>);
    const box = screen.getByRole('heading');
    expect(box).toBeInTheDocument();
  });
});
