import { Box, Button, Text } from 'components';
import React from 'react';
import './deleteModal.scss';

interface Props {
  handleCancel: () => void;
  handleDelete: () => void;
}

const DeleteModal: React.FC<Props> = ({ handleCancel, handleDelete }) => {
  return (
    <Box className="currencyDelete">
      <Text as="h6" variant="h6" className="currencyDelete__text">
        Are you sure you want to delete this currency?
      </Text>
      <Box className="currencyDelete__btn">
        <Button onClick={handleCancel} variant="gray">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Yes, Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteModal;
