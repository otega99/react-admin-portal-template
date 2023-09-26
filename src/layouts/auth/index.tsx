import { brand } from 'assets';
import { Box } from 'components';
import React, { ReactNode } from 'react';
import './auth.scss';

interface Props {
  children?: ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box className="authLayout">
      <Box as="aside" className="authLayout__aside"></Box>
      <Box as="main" className="authLayout__main">
        <Box className="authLayout__mainContainer">
          <Box as="header" className="authLayout__header">
            <img src={brand} alt="logo" />
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
