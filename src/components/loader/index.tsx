import { Box, Text } from 'components';
import { BiLoaderAlt } from 'react-icons/bi';
import React from 'react';
import './loader.scss';

const Loader = () => {
  return (
    <Box className="loader">
      <Box className="loader__box">
        <BiLoaderAlt />
        <Text variant="h5" className="loader__text">
          Respected FX
        </Text>
      </Box>
    </Box>
  );
};

export default Loader;
