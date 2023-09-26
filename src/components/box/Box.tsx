import React, { HTMLAttributes } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BoxProps<T = any> extends HTMLAttributes<T> {
  // keyof takes an object type and returns a union of its keys
  as?: keyof JSX.IntrinsicElements;
}

const Box: React.FC<BoxProps> = ({ as = 'div', ...props }) => {
  const Tag = as;
  return <Tag data-testid="box" {...props} />;
};

export default Box;
