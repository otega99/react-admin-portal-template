import { Box, Button, Text } from 'components';
import React from 'react';
import './deleteModal.scss';

interface Props {
  handleCancel: () => void;
  handleDelete: () => void;
  isLoading: boolean;
}

const DeleteModal: React.FC<Props> = ({ handleCancel, handleDelete, isLoading }) => {
  return (
    <Box className="faqDelete">
      <Text as="h6" variant="h6" className="faqDelete__text">
        Are you sure you want to delete this FAQ?
      </Text>
      <Box className="faqDelete__btn">
        <Button onClick={handleCancel} variant="gray">
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleDelete} variant="danger">
          Yes, Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteModal;
