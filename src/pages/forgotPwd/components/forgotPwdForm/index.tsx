import { Box, Button, Form, FormField, LinkTag } from 'components';
import React from 'react';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { userSchema } from 'validations';
import { Path } from 'navigations/routes';

interface Props {
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: UserForgotPwdI,
    // eslint-disable-next-line no-unused-vars
    helpers: FormikHelpers<UserForgotPwdI>
  ) => Promise<void>;
  isLoading: boolean;
  previousEmail: string;
}

export interface UserForgotPwdI {
  email: string;
}

const initialValues: UserForgotPwdI = {
  email: ''
};

const validationSchema = yup.object().shape({
  email: userSchema.email
});

const ForgotPwdForm: React.FC<Props> = ({ handleSubmit, isLoading, previousEmail }) => {
  return (
    <Form<UserForgotPwdI>
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="forgotPwd__form"
      initialValues={
        {
          email: previousEmail
        } || initialValues
      }>
      <FormField name="email" type="email" label="Email" />
      <Box className="forgotPwd__forgotDiv">
        <span>Remember your password? </span>
        <LinkTag to={Path.Login} variant="primary" className="forgotPwd__forgotLink">
          Login
        </LinkTag>
      </Box>
      <Box className="forgotPwd__btnDiv">
        <Button disabled={isLoading} fullWidth type="submit">
          Continue
        </Button>
      </Box>
    </Form>
  );
};

export default ForgotPwdForm;
