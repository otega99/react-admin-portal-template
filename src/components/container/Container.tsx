import React, { ReactNode } from 'react';
import cs from 'classnames';
import './container.scss';

interface Props {
  className?: string;
  children?: ReactNode;
}

const Container: React.FC<Props> = ({ className, children }) => {
  const classes = cs('container', {
    [`${className}`]: className
  });
  return <div className={classes}>{children}</div>;
};

export default Container;
