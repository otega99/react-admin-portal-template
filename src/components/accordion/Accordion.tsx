import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import './accordion.scss';

interface Data {
  title: string;
  content: string;
}

interface AccordionProps {
  data: Data[];
  single?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ data, single = false }) => {
  const [active, setActive] = useState(-1);

  const handleToggle = (index: number) => {
    if (active === index) return setActive(-1);
    return setActive(index);
  };

  return (
    <div className="accordion" data-testid="accordion">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          {...item}
          active={active === index}
          single={single}
          handleToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
