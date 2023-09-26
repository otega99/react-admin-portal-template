import { Box, Button, Form, FormField, LinkTag } from 'components';
import React from 'react';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { userSchema } from 'validations';
import { Path } from 'navigations/routes';

interface Props {
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: UserLoginI,
    // eslint-disable-next-line no-unused-vars
    helpers: FormikHelpers<UserLoginI>
  ) => Promise<void>;
  isLoading: boolean;
}

export interface UserLoginI {
  email: string;
  password: string;
}

const initialValues: UserLoginI = {
  email: '',
  password: ''
};

const validationSchema = yup.object().shape({
  email: userSchema.email,
  password: userSchema.password
});

const LoginForm: React.FC<Props> = ({ handleSubmit, isLoading }) => {
  return (
    <Form<UserLoginI>
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="login__form"
      initialValues={initialValues}>
      <FormField name="email" type="email" label="Email" />
      <FormField name="password" type="password" label="Password" />
      <Box className="login__forgotDiv">
        <LinkTag to={Path.ForgotPwd} variant="primary" className="login__forgotLink">
          Forgot Password?
        </LinkTag>
      </Box>
      <Box className="login__btnDiv">
        <Button fullWidth disabled={isLoading} type="submit">
          Login
        </Button>
      </Box>
    </Form>
  );
};

export default LoginForm;
