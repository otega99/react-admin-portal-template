import { Box, Text, useAlert } from 'components';
import { AuthLayout } from 'layouts';
import React from 'react';
import LoginForm, { UserLoginI } from './components/loginForm';
import { FormikHelpers } from 'formik';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import { Path } from 'navigations/routes';
import { useAdminLogin } from 'hooks';
import Api from 'types/client';
import { STORAGE_USER } from 'constants/index';

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { mutate, isLoading } = useAdminLogin({
    onSuccess: (data) => {
      sessionStorage.setItem(STORAGE_USER, data.data.accessToken);
      alert({
        message: 'Login Successful'
      });
      navigate(Path.Dashboard);
    },
    onError(error) {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = async (values: UserLoginI, helpers: FormikHelpers<UserLoginI>) => {
    const payload: Api.Admin.Login.Request = {
      emailAddress: values.email,
      password: values.password
    };
    mutate(payload);
  };
  return (
    <AuthLayout>
      <Box className="login">
        <Text className="login__header" as="h1" variant="h2">
          Welcome Back
        </Text>
        <Text variant="medium" className="login__subHeader">
          Kindly Login to your account
        </Text>
        <LoginForm isLoading={isLoading} handleSubmit={handleSubmit} />
      </Box>
    </AuthLayout>
  );
};

export default Login;
