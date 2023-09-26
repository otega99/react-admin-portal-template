import { Box, Dialog, Text, useAlert } from 'components';
import { AuthLayout } from 'layouts';
import React, { useState } from 'react';
import ForgotPwdForm, { UserForgotPwdI } from './components/forgotPwdForm';
import { FormikHelpers } from 'formik';
import './forgotPwd.scss';
import VerifyMailForm, { UserVerifyMailI } from './components/verifyMail';
import SuccessModal from './components/successModal';
import { useAdminForgotPwd, useAdminResetPwd } from 'hooks';
import Api from 'types/client';

const ForgotPwd = () => {
  const [state, setState] = useState(1);
  const [recipientMail, setRecipientMail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const alert = useAlert();

  const { mutateAsync, isLoading: forgotPwdLoading } = useAdminForgotPwd({
    onSuccess: () => {
      setState(2);
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });

  const { mutate, isLoading: resetPwdLoading } = useAdminResetPwd({
    onSuccess: () => {
      handleOpenModal();
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleForgotPwd = async (
    values: UserForgotPwdI,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    helpers: FormikHelpers<UserForgotPwdI>
  ) => {
    const payload: Api.Admin.ForgotPassword.Request = {
      emailAddress: values.email
    };
    const res = await mutateAsync(payload);

    if (res) {
      setRecipientMail(values.email);
    }
  };

  const handleVerifyMail = async (
    values: UserVerifyMailI,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    helpers: FormikHelpers<UserVerifyMailI>
  ) => {
    const payload: Api.Admin.ResetPassword.Request = {
      ConfirmPassword: values.confirmPassword,
      Password: values.password,
      Token: values.otp
    };

    mutate(payload);
  };

  const handleBack = () => {
    setState(1);
  };

  return (
    <AuthLayout>
      <Box className="forgotPwd">
        <Text className="forgotPwd__header" as="h1" variant="h2">
          {state === 1 ? 'Reset Password' : 'Verify Your Mail'}
        </Text>
        <Text variant="medium" className="forgotPwd__subHeader">
          {state === 1
            ? `Please enter the email address associated with this account and we will send a password
          reset instructions.`
            : `Please enter the 6 digit code sent to ${recipientMail} and fill in you password.`}
        </Text>
        <Box className="forgotPwd__form">
          {state === 1 && (
            <ForgotPwdForm
              previousEmail={recipientMail}
              isLoading={forgotPwdLoading}
              handleSubmit={handleForgotPwd}
            />
          )}
          {state === 2 && (
            <VerifyMailForm
              isLoading={resetPwdLoading}
              handleBack={handleBack}
              handleSubmit={handleVerifyMail}
            />
          )}
        </Box>
        <Dialog
          removeHead
          removeCloseBtn
          disableOverlayClick
          state={showModal}
          handleClose={handleCloseModal}>
          <SuccessModal />
        </Dialog>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPwd;
