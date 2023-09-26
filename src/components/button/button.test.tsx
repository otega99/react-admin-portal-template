import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';
import { BrowserRouter } from 'react-router-dom';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('Button');
  });

  it('should be button tag by default', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should be clickable', () => {
    const mockFunc = jest.fn();
    render(<Button onClick={mockFunc}>Click Button</Button>);

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(mockFunc).toBeCalled();
  });

  it('should not be clickable when it is disabled', () => {
    const mockFunc = jest.fn();
    render(
      <Button disabled onClick={mockFunc}>
        Click Button
      </Button>
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(mockFunc).not.toBeCalled();
  });

  it('another way of checking for disabled', () => {
    render(<Button disabled>Click Button</Button>);

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('should render a link or anchor tag when a value of link is passed to the as prop', () => {
    render(
      <BrowserRouter>
        <Button as="link">Button Link</Button>
      </BrowserRouter>
    );

    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
  });
});
