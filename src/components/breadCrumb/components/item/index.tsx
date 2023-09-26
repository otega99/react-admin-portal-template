import React from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbItemProps } from '../../types/breadCrumbTypes';
import cs from 'classnames';
import './item.scss';

const BreadCrumbItem: React.FC<BreadCrumbItemProps> = ({
  variant = 'link',
  to = '/',
  children,
  className
}) => {
  const textClasses = cs('breadCrumbItem__text', {
    [`${className}`]: className
  });
  const linkClasses = cs('breadCrumbItem__link', {
    [`${className}`]: className
  });
  return variant === 'text' ? (
    <span className={textClasses}>{children}</span>
  ) : (
    <Link className={linkClasses} to={to as string}>
      {children}
    </Link>
  );
};

export default BreadCrumbItem;
