import { Box, Button, Dialog, Text, useAlert } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useAdminChangePwd } from 'hooks';
import React, { useState } from 'react';
import Api from 'types/client';
import ChangePwd, { ChangePwdI } from '../changePwd';
import './profilePwd.scss';

const ProfilePwd = () => {
  const [showModal, setShowModal] = useState(false);

  const alert = useAlert();
  const { user, token } = useAuth();
  const { mutate, isLoading } = useAdminChangePwd({
    onSuccess: () => {
      alert({
        message: 'Password updated succesfully'
      });

      handleCloseModal();
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

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: ChangePwdI, formikHelpers: FormikHelpers<ChangePwdI>) => {
    const payload: Api.Admin.ChangePassword.Request = {
      confirmPassword: values.confirmPassword,
      emailAddress: user?.emailAddress || '',
      oldPassword: values.currentPassword,
      password: values.newPassword,
      token
    };
    mutate(payload);
  };
  return (
    <Box className="profilePwd">
      <Box className="profilePwd__head">
        <Text>Password</Text>
        <Button onClick={handleOpenModal} variant="danger">
          Change Password
        </Button>
      </Box>
      {/* <Box>
        <Text>********</Text>
      </Box> */}

      <Dialog handleClose={handleCloseModal} state={showModal} header="Change Password">
        <ChangePwd isLoading={isLoading} handleSubmit={handleSubmit} />
      </Dialog>
    </Box>
  );
};

export default ProfilePwd;
