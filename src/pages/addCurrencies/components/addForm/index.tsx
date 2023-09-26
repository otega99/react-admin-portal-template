import { Box, Button, Form, FormField } from 'components';
import { FormikHelpers } from 'formik';
import React from 'react';
import './addForm.scss';

export interface AddFormI {
  name: string;
  buyRate: string;
  sellRate: string;
  processingFee: string;
  bankFeeCash: string;
  bankFeeTransfer: string;
}

const initialState: AddFormI = {
  name: '',
  buyRate: '',
  sellRate: '',
  processingFee: '',
  bankFeeCash: '',
  bankFeeTransfer: ''
};

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: AddFormI, formikHelpers: FormikHelpers<AddFormI>) => void;
}

const AddForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <Form<AddFormI> className="addForm" onSubmit={handleSubmit} initialValues={initialState}>
      <FormField.File name="logo" label="Add Currency  Logo" />
      <FormField name="name" label="Currency Name" />
      <FormField name="buyRate" label="Buy Rate" />
      <FormField name="sellRate" label="Sell Rate" />
      <FormField name="processingFee" label="Processing fee" />
      <FormField name="bankFeeCash" label="Bank Fee (Cash Deposit)" />
      <FormField name="bankFeeTransfer" label="Bank Fee (Transfer)" />
      <Box className="addForm__btnDiv">
        <Button>Submit</Button>
      </Box>
    </Form>
  );
};

export default AddForm;
