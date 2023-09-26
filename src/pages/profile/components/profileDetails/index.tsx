import { avatarLogo } from 'assets';
import { BasicInfo, Box, Button, Dialog, Image, Text, useAlert } from 'components';
import { baseURL } from 'config/AxiosConfig';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useAdminUpdate } from 'hooks';
import React, { useState } from 'react';
import Api from 'types/client';
import EditProfile, { EditProfileI } from '../editProfile';
import './profileDetails.scss';


interface Props {
  user: Api.AdminI | undefined;
}

const ProfileDetails = ({ user }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const alert = useAlert();
  const { token } = useAuth();
  const { mutate, isLoading } = useAdminUpdate({
    onSuccess: () => {
      alert({
        message: 'Personal Information updated'
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
  const handleSubmit = (values: EditProfileI, _formikHelpers: FormikHelpers<EditProfileI>) => {
    const payload: Api.Admin.UpdateAdmin.Request = {
      token,
      address: values.address,
      emailAddress: values.email,
      phoneNumber: values.phoneNumber
    };
    mutate(payload);
  };

  const imgSrc = `${baseURL}/static/images/${user?.profilePicturePath}`;

  return (
    <Box className="profileDetails">
      <Box className="profileDetails__head">
        <Box className="profileDetails__headInfo">
          <Image
            src={user?.profilePicturePath ? imgSrc : ''}
            onError={(e) => {
              e.currentTarget.src = avatarLogo;
            }}
            imgClasses="profileDetails__img"
            alt=""
          />
          <Text className="profileDetails__name" variant="caption">
            {user?.firstName} {user?.lastName}
          </Text>
        </Box>
        <Box>
          <Button onClick={handleOpenModal} className="profileDetails__btn">
            Edit
          </Button>
        </Box>
      </Box>
      <Text className="profileDetails__header">Personal Information</Text>
      <Box className="profileDetails__infoBox">
        <BasicInfo header="Phone Number" text={user?.phoneNumber} />
      </Box>
      <Box className="profileDetails__infoBox">
        <BasicInfo header="Email" text={user?.emailAddress} />
      </Box>
      <Box className="profileDetails__infoBox">
        <BasicInfo header="Address" text={user?.address || ''} />
      </Box>

      <Dialog handleClose={handleCloseModal} state={showModal} header="Edit Personal Information">
        <EditProfile isLoading={isLoading} handleSubmit={handleSubmit} user={user} />
      </Dialog>
    </Box>
  );
};

export default ProfileDetails;
