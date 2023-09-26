import { Box, BreadCrumbBox, Container, useAlert } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useAddAdmin } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import AddAdminForm, { AddAdminI } from './components/addAdminForm';

const AddAdmin = () => {
  const alert = useAlert();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddAdmin({
    onSuccess: () => {
      alert({
        message: 'Admin created successfully'
      });

      navigate(Path.Admin);
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleSubmit = (values: AddAdminI, _formikHelpers: FormikHelpers<AddAdminI>) => {
    console.log(values.roleid)
    const payload: Api.Admins.AddAdmin.Request = {
      Address: values.address,
      EmailAddress: values.email,
      FirstName: values.firstName,
      LastName: values.lastName,
      Password: values.password,
      PhoneNumber: values.phoneNumber,
      ProfilePicture: values.image,
      RoleId:values.roleid,
      token
    };
    mutate(payload);
  };
  return (
    <ContentMgtLayout backPath={Path.Admin} isPrevBtn header="Admin">
      <Box className="addAdmin">
        <Container className="addAdmin__container">
          <Box className="addAdmin__head">
            <BreadCrumbBox firstTextLink={Path.Admin} firstText="Admin" secondText="Add Admin" />
          </Box>
          <AddAdminForm isLoading={isLoading} handleSubmit={handleSubmit} />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default AddAdmin;
