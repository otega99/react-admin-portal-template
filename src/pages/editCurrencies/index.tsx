import { Box, BreadCrumbBox, Container, Text, useAlert } from 'components';
import { FormikHelpers } from 'formik';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import './editCurrencies.scss';
import EditForm, { EditFormI } from './components/editForm';
import { useParams } from 'react-router-dom';
import { useGetSingleCurrency, useUpdateCurrency } from 'hooks';
import Api from 'types/client';
import { useAuth } from 'contexts/AuthProvider';

const EditCurrencies = () => {
  const alert = useAlert();
  const { token } = useAuth();
  const params = useParams<{ id: string }>();

  const payload: Api.Currencies.GetSingleCurrency.Request = {
    id: params.id || '',
    token
  };
  const { data, isLoading } = useGetSingleCurrency(payload);

  const { mutate, isLoading: updateLoading } = useUpdateCurrency({
    onSuccess: () => {
      alert({
        message: 'Currency updated successfully'
      });
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something wennt wrong!!!'
      });
    }
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: EditFormI, formikHelpers: FormikHelpers<EditFormI>) => {
    const payload: Api.Currencies.UpdateCurrency.Request = {
      bankFeePercent: Number(values.bankFee) || 0,
      buyRate: Number(values.buyRate) || 0,
      currency: values.name,
      id: params.id || '',
      processingFee: Number(values.processingFee) || 0,
      sellRate: Number(values.sellRate) || 0,
      status: data?.data.status || '',
      token: token,
      type: values.type
    };

    mutate(payload);
  };
  return (
    <ContentMgtLayout backPath={Path.Currencies} isPrevBtn header="Currency Rates">
      <Box className="editCurrencies">
        <Container className="editCurrencies__container">
          <Box className="editCurrencies__head">
            <BreadCrumbBox
              firstTextLink={Path.Currencies}
              firstText="Currency Rates"
              secondText="Edit Currency"
            />
          </Box>
          <Box className="editCurrencies__body">
            <Text as="h6" variant="h6" className="editCurrencies__header">
              Edit Currency
            </Text>
            <EditForm
              data={data}
              getCurrencyLoading={isLoading}
              updateLoading={updateLoading}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default EditCurrencies;
