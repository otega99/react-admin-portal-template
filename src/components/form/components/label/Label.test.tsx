import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label Component', () => {
  it('should render label component', () => {
    render(<Label id="1">error</Label>);
    const errorElement = screen.getByTestId('label');
    expect(errorElement).toBeInTheDocument();
  });

  it('should render the correct label word', () => {
    render(<Label id="1">error</Label>);
    const errorElement = screen.getByText('error');
    expect(errorElement).toBeInTheDocument();
  });
});
