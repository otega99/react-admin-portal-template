import { Box, BreadCrumbBox, Container, Text, useAlert } from 'components';
import { FormikHelpers } from 'formik';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import './addCurrencies.scss';
import AddForm, { AddFormI } from './components/addForm';

const AddCurrencies = () => {
  const alert = useAlert();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: AddFormI, formikHelpers: FormikHelpers<AddFormI>) => {
    alert({
      message: 'Currency added successfully'
    });
  };
  return (
    <ContentMgtLayout backPath={Path.Currencies} isPrevBtn header="Currency Rates">
      <Box className="addCurrencies">
        <Container className="addCurrencies__container">
          <Box className="addCurrencies__head">
            <BreadCrumbBox
              firstTextLink={Path.Currencies}
              firstText="Currency Rates"
              secondText="Add Currency"
            />
          </Box>
          <Box className="addCurrencies__body">
            <Text as="h6" variant="h6" className="addCurrencies__header">
              Add Currency
            </Text>
            <AddForm handleSubmit={handleSubmit} />
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default AddCurrencies;
