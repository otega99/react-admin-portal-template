import { Box } from 'components/box';
import Text from 'components/text';
import React, { ReactNode } from 'react';
import './basicInfo.scss';
import cs from 'classnames';

interface Props {
  header: string;
  text?: string;
  children?: ReactNode;
  className?: string;
}

const BasicInfo: React.FC<Props> = ({ header, text, children, className }) => {
  const classes = cs('basicInfo', className);
  return (
    <Box className={classes}>
      <Text className="basicInfo__header">{header}</Text>
      {text && <Text className="basicInfo__text">{text}</Text>}
      {children}
    </Box>
  );
};

export default BasicInfo;
