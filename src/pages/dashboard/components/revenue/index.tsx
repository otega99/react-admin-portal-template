import { Box, Text } from 'components';
import React from 'react';
import './revenue.scss';

const Revenue = () => {
  return (
    <Box className="revenue">
      <Box className="revenue__head">
        <Text as="h5" variant="h6">
          Revenue
        </Text>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Revenue;
