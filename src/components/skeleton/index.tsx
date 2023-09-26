import React from 'react';
import { Box } from '../box';
import cs from 'classnames';
import './skeleton.scss';

interface Props {
  className?: string;
}

const Skeleton = ({ className }: Props) => {
  const classes = cs('skeleton', className);
  return <Box className={classes} data-testid="skeleton" />;
};

export default Skeleton;
