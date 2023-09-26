import { Box } from 'components/box';
import Text from 'components/text';
import React from 'react';
import { GiEmptyHourglass } from 'react-icons/gi';
import './emptyDataBox.scss';

const EmptyDataBox = () => {
  return (
    <Box className="emptyDataBox">
      <GiEmptyHourglass />
      <Text variant="h6">No data found</Text>
    </Box>
  );
};

export default EmptyDataBox;
