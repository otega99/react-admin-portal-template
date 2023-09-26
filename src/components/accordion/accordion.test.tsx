import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import { Accordion } from '.';
import '@testing-library/jest-dom';

const data = [
  {
    title: 'This is the first accordion title',
    content: 'This is the first accordion content'
  },
  {
    title: 'This is the second accordion title',
    content: 'This is the second accordion content'
  },
  {
    title: 'This is the third accordion title',
    content: 'This is the third accordion content'
  }
];

describe('Accordion Component', () => {
  it('should render the particular amount of data in the array', () => {
    render(<Accordion data={data} />);
    const accordionItems = screen.getAllByTestId('accordionItem');
    expect(accordionItems.length).toBe(3);
  });

  it('should not show any accordion content by default', () => {
    render(<Accordion data={data} />);
    const accordionContents = screen.getAllByTestId('accordionBody');
    const accordionArray = [];

    accordionContents.forEach((item) => {
      if (item.style.maxHeight === '0px') {
        accordionArray.push(item);
      }
    });

    expect(accordionArray.length).toBe(3);
  });

  it('each accordion should be independent by default', () => {
    render(<Accordion data={data} />);
    const accordionItems = screen.getAllByTestId('accordionItem');
    const firstAccordion = accordionItems[0];

    // within is similar to gquerySelector
    const firstAccordionHead = within(firstAccordion).getByTestId('accordionHead');
    const firstAccordionBody = within(firstAccordion).getByTestId('accordionBody');

    const secondAccordion = accordionItems[1];
    const secondAccordionHead = within(secondAccordion).getByTestId('accordionHead');

    fireEvent.click(firstAccordionHead);
    fireEvent.click(secondAccordionHead);

    expect(firstAccordionBody).toHaveClass('active');
  });

  it('should show just one accordion item when the single prop is passed', () => {
    render(<Accordion single data={data} />);
    const accordionItems = screen.getAllByTestId('accordionItem');
    const firstAccordion = accordionItems[0];
    const firstAccordionHead = within(firstAccordion).getByTestId('accordionHead');

    const secondAccordion = accordionItems[1];
    const secondAccordionHead = within(secondAccordion).getByTestId('accordionHead');

    const thirdAccordion = accordionItems[2];
    const thirdAccordionHead = within(thirdAccordion).getByTestId('accordionHead');

    fireEvent.click(firstAccordionHead);
    fireEvent.click(secondAccordionHead);
    fireEvent.click(thirdAccordionHead);

    const accordionContents = screen.getAllByTestId('accordionBody');
    const accordionArray = [];

    accordionContents.forEach((item) => {
      if (item.classList.contains('active')) {
        accordionArray.push(item);
      }
    });

    expect(accordionArray.length).toBe(1);
  });
});
