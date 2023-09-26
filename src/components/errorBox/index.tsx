import { Box } from 'components/box';
import { Button } from 'components/button';
import Text from 'components/text';
import React from 'react';
import { IoMdRefresh } from 'react-icons/io';
import './errorBox.scss';

interface Props {
  handleRetry: () => void;
}

const ErrorBox = ({ handleRetry }: Props) => {
  return (
    <Box className="errorBox">
      <Text variant="h6" className="errorBox__errorText">
        Error fetching data
      </Text>
      <Button className="errorBox__errorBtn" variant="primary-outline" onClick={handleRetry}>
        <IoMdRefresh />
        <span>Retry</span>
      </Button>
    </Box>
  );
};

export default ErrorBox;
