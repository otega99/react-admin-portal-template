import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMsg from './ErrorMsg';

describe('ErrorMsg Component', () => {
  it('should render errorMsg component', () => {
    render(<ErrorMsg>error</ErrorMsg>);
    const errorElement = screen.getByTestId('errorMsg');
    expect(errorElement).toBeInTheDocument();
  });

  it('should render the correct error message', () => {
    render(<ErrorMsg>error</ErrorMsg>);
    const errorElement = screen.getByText('error');
    expect(errorElement).toBeInTheDocument();
  });
});
