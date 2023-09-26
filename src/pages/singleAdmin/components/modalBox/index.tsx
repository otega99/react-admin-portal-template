import { Box, Button, Text } from 'components';
import React from 'react';
import './modalBox.scss';

interface Props {
  variant: 'block' | 'delete';
  blockVariant?: 'block' | 'unblock';
  handleSubmit: () => void;
  handleClose: () => void;
  isLoading?: boolean;
}

const ModalBox = ({ variant, blockVariant, handleClose, handleSubmit, isLoading }: Props) => {
  return (
    <Box className="modalBox">
      <Text className="modalBox__text">
        {variant === 'block'
          ? `Are you sure you want to ${
              blockVariant === 'unblock' ? 'unblock' : 'block'
            } this admin ?`
          : 'Are you sure you want to delete this admin ?'}
      </Text>
      <Box className="modalBox__btns">
        <Button onClick={handleClose} variant="gray">
          Cancel
        </Button>
        <Button loading={isLoading} onClick={handleSubmit} variant="danger">
          {variant === 'block'
            ? `${blockVariant === 'unblock' ? 'Unblock' : 'Block'}`
            : 'Yes, Delete'}
        </Button>
      </Box>
    </Box>
  );
};

export default ModalBox;
