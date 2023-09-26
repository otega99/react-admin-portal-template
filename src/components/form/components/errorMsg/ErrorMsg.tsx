import React, { ReactNode } from 'react';
import styles from './errorMsg.module.scss';

interface Props {
  children?: ReactNode;
}

const ErrorMsg: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.errorMsg} data-testid="errorMsg">
      {children}
    </div>
  );
};

export default ErrorMsg;
