import { Box, Button, Form, FormField } from 'components';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import Api from 'types/client';
import './editForm.scss';

export interface EditFormI {
  type: string;
  name: string;
  buyRate: string;
  sellRate: string;
  processingFee: string;
  bankFee: string;
}

const initialState: EditFormI = {
  type: '',
  name: '',
  buyRate: '',
  sellRate: '',
  processingFee: '',
  bankFee: ''
};

interface Props {
  data: Api.Currencies.GetSingleCurrency.Response | undefined;
  getCurrencyLoading: boolean;
  updateLoading: boolean;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  handleSubmit: (values: EditFormI, formikHelpers: FormikHelpers<EditFormI>) => void;
}

const EditForm: React.FC<Props> = ({ handleSubmit, data, updateLoading }) => {
  const [formData, setFormData] = useState<EditFormI>();

  useEffect(() => {
    if (data) {
      setFormData({
        bankFee: data.data.bankFeePercent.toString(),
        buyRate: data.data.buyRate.toString(),
        name: data.data.currency,
        processingFee: data.data.processingFee.toString(),
        sellRate: data.data.sellRate.toString(),
        type: data.data.type
      });
    }
  }, [data]);
  return (
    <Form<EditFormI>
      enableReinitialize
      className="editForm"
      onSubmit={handleSubmit}
      initialValues={formData || initialState}>
      {/* <FormField.File name="logo" label="Add Currency  Logo" /> */}
      <FormField name="type" label="Type" />
      <FormField name="name" label="Currency Name" />
      <FormField name="buyRate" label="Buy Rate" />
      <FormField name="sellRate" label="Sell Rate" />
      <FormField name="processingFee" label="Processing fee" />
      <FormField name="bankFee" label="Bank Fee (%)" />
      <Box className="editForm__btnDiv">
        <Button type="submit" disabled={updateLoading}>
          Update Changes
        </Button>
      </Box>
    </Form>
  );
};

export default EditForm;
