import React, { useState, useRef, useEffect } from 'react';
import cs from 'classnames';
import { MdChevronRight } from 'react-icons/md';
import './accordionItem.scss';

interface AccordionItemProps {
  title: string;
  content: string;
  active: boolean;
  single: boolean;
  handleToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  single,
  active,
  handleToggle
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState('0px');
  const [isActive, setIsActive] = useState(isVisible);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (single) return setIsActive(active);
    return setIsActive(isVisible);
  }, [single, active, isVisible]);

  useEffect(() => {
    if (isActive) {
      if (contentRef.current) {
        return setContentHeight(`${contentRef.current.scrollHeight}px`);
      }
      return setContentHeight('0px');
    } else {
      setContentHeight('0px');
    }
  }, [isActive]);

  const onToggle = () => {
    setIsVisible(!isVisible);
    handleToggle();
  };

  const bodyClasses = cs('accordionItem__body', {
    active: isActive
  });

  const headClasses = cs('accordionItem__head', {
    active: isActive
  });
  return (
    <div className="accordionItem" data-testid="accordionItem">
      <div className={headClasses} data-testid="accordionHead" onClick={onToggle}>
        <span>{title}</span>
        <MdChevronRight />
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: `${contentHeight}`
        }}
        className={bodyClasses}
        data-testid="accordionBody">
        <div className="accordionItem__content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default AccordionItem;
