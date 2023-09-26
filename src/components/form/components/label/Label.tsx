import React, { ReactNode } from 'react';
import styles from './label.module.scss';

interface Props {
  id: string;
  children?: ReactNode;
}

const LabelText: React.FC<Props> = ({ children, id }) => {
  return (
    <label className={styles.labelText} data-testid="label" htmlFor={id}>
      {children}
    </label>
  );
};

export default LabelText;
