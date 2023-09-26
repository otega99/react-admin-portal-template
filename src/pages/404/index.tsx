import { Box, Button, Container, Text } from 'components';
import { Path } from 'navigations/routes';
import React from 'react';
import './404.scss';

const NotFound = () => {
  return (
    <Box className="notFound">
      <Container className="notFound__container">
        <Box className="notFound__body">
          <Text variant="displayMedium">404</Text>
          <Text variant="medium">Sorry, page not found</Text>
          <Button as="link" to={Path.Home}>
            Go to home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
