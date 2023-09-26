import { Box, Button, Form, FormField } from 'components';
import { FormikHelpers } from 'formik';
import React from 'react';
import * as yup from 'yup';
import './changePwd.scss';

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: ChangePwdI, formikHelpers: FormikHelpers<ChangePwdI>) => void;
  isLoading: boolean;
}

export interface ChangePwdI {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: ChangePwdI = {
  confirmPassword: '',
  newPassword: '',
  currentPassword: ''
};

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Please enter current password'),
  newPassword: yup.string().required('Please enter new password'),
  confirmPassword: yup.string().required('Please enter confirm password')
});

const ChangePwd = ({ handleSubmit, isLoading }: Props) => {
  return (
    <Box className="profileEditPwd">
      <Form<ChangePwdI>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <FormField label="Current Password" name="currentPassword" type="password" />
        <FormField label="New Password" name="newPassword" type="password" />
        <FormField label="Confirm Password" name="confirmPassword" type="password" />
        <Box>
          <Button loading={isLoading} type="submit">
            Update Password
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default ChangePwd;
