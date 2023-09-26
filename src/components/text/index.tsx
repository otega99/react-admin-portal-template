import React, { FC } from 'react';
import cs from 'classnames';
import { Box, BoxProps } from '../box';
import './text.scss';

export type TextVariant =
  | 'tiny'
  | 'footnote'
  | 'caption'
  | 'body'
  | 'medium'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'displaySmall'
  | 'displayMedium'
  | 'displayLarge';

export type TextProps = {
  variant?: TextVariant;
} & BoxProps;

const classes: Record<TextVariant, string> = {
  tiny: 'text--tiny',
  footnote: 'text--footnote',
  caption: 'text--caption',
  body: 'text--body',
  medium: 'text--medium',
  h1: 'text--h1',
  h2: 'text--h2',
  h3: 'text--h3',
  h4: 'text--h4',
  h5: 'text--h5',
  h6: 'text--h6',
  displaySmall: 'text--displaySmall',
  displayMedium: 'text--displayMedium',
  displayLarge: 'text--displayLarge'
};

const Text: FC<TextProps> = (props) => {
  const { children, as = 'div', className = '', variant = 'body', ...otherProps } = props;

  const baseClass = `text ${classes[variant]}` || '';

  return (
    <Box as={as} className={cs(baseClass, className)} {...otherProps}>
      {children}
    </Box>
  );
};

export default Text;
