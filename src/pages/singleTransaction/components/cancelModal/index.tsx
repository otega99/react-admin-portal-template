import { Box, Button, FormField, Text, Form } from 'components';
import { FormikHelpers } from 'formik';
import React from 'react';
import * as yup from 'yup';
import './cancelModal.scss';

export interface InitialStateI {
  message: string;
}

const initialState: InitialStateI = {
  message: ''
};

const validationSchema = yup.object().shape({
  message: yup.string().required('Please enter the reason')
});

interface Props {
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleCancelSubmit: (values: InitialStateI, formikHelpers: FormikHelpers<InitialStateI>) => void;
}

const CancelModal: React.FC<Props> = ({ handleCancelSubmit, isLoading }) => {
  return (
    <Box className="cancelModal">
      <Text className="cancelModal__header">Why are you cancelling this transaction?</Text>
      <Form<InitialStateI>
        onSubmit={handleCancelSubmit}
        initialValues={initialState}
        validationSchema={validationSchema}
        className="cancelModal__form">
        <FormField.TextArea
          className="cancelModal__input"
          placeholder="Explain briefly"
          name="message"
        />
        <Box className="cancelModal__btnDiv">
          <Button disabled={isLoading} className="cancelModal__btn">
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default CancelModal;
