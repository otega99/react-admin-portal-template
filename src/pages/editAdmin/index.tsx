import { Box, BreadCrumbBox, Container } from 'components';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';

const EditAdmin = () => {
  return (
    <ContentMgtLayout backPath={Path.Admin} isPrevBtn header="Currency Rates">
      <Box className="addAdmin">
        <Container className="addAdmin__container">
          <Box className="addAdmin__head">
            <BreadCrumbBox firstTextLink={Path.Admin} firstText="Admin" secondText="Add Currency" />
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default EditAdmin;
