import { Box, Button, FormField, Text, Form } from 'components';
import { FormikHelpers } from 'formik';
import React from 'react';
import * as yup from 'yup';
import './addModal.scss';

export interface InitialStateI {
  rolename: string;
}

const initialState: InitialStateI = {
  rolename: ''
};

const validationSchema = yup.object().shape({
  rolename: yup.string().required('Please enter the rolename')
});

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleCancelSubmit: (values: InitialStateI, formikHelpers: FormikHelpers<InitialStateI>) => void;
}

const AddModal: React.FC<Props> = ({ handleCancelSubmit }) => {
  return (
    <Box className="addModal">
      <Form<InitialStateI>
        onSubmit={handleCancelSubmit}
        initialValues={initialState}
        validationSchema={validationSchema}
        className="addModal__form">
        <FormField label="Role Name" placeholder="New Role Name" name="rolename" />
        <Box className="addModal__btnDiv">
          <Button className="addModal__btn">Save</Button>
        </Box>
      </Form>
    </Box>
  );
};

export default AddModal;
