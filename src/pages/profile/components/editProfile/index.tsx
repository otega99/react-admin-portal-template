import { Box, Button, Form, FormField } from 'components';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import Api from 'types/client';
import * as yup from 'yup';
import './editProfile.scss';
import { specifyRole, Role } from 'utils/role';

interface Props {
  user: Api.AdminI | undefined;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: EditProfileI, formikHelpers: FormikHelpers<EditProfileI>) => void;
  isLoading: boolean;
}

export interface EditProfileI {
  phoneNumber: string;
  email: string;
  address: string;
}

const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Please enter your Phone number in this format. Eg, +234xxxxxxxx')
    .matches(/^[0-9, +]*$/, {
      message: 'Please enter only digits. Eg, +234xxxxxxxx'
    }),
  email: yup.string().required('Please enter email').email('Invalid email'),
  address: yup.string().required('Please enter address')
});

const EditProfile = ({ user, handleSubmit, isLoading }: Props) => {
  const [initialValues, setInitialValues] = useState<EditProfileI>({
    address: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        address: user.address || '',
        email: user.emailAddress,
        phoneNumber: user.phoneNumber
      });
    }
  }, [user]);
  return (
    <Box className="profileEditPwd">
      <Form<EditProfileI>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}>
        <FormField
          label="Phone Number"
          name="phoneNumber"
          placeholder="Eg, +234**********"
          type="tel"
        />
        <FormField label="Email" name="email" type="email" />
        <FormField label="Address" name="address" />
        <Box>
          <Button loading={isLoading} type="submit">
            Update Changes
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default EditProfile;
