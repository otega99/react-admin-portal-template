import { Box, Button, Form, FormField , Text} from 'components';
import { FormikHelpers } from 'formik';
import React, { useState } from "react";
import * as yup from 'yup';
import './addAdminForm.scss';
import {  useGetAllRoles } from 'hooks';
import { useAuth } from 'contexts/AuthProvider';
import Api from 'types/client';

interface Props {
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: AddAdminI, formikHelpers: FormikHelpers<AddAdminI>) => void;
}

export interface AddAdminI {
  firstName: string;
  lastName: string;
  roleid:number;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  image: string;
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const validationSchema = yup.object().shape({
  firstName: yup.string().required('Please enter first name'),
  lastName: yup.string().required('Please enter last name'),
  email: yup.string().required('Please enter email').email('Invalid email'),
  roleid: yup.number().required('Please select a role'),
  phoneNumber: yup
    .string()
    .required('Please enter your Phone number in this format. Eg, +234xxxxxxxx')
    .matches(/^[0-9, +]*$/, {
      message: 'Please enter only digits. Eg, +234xxxxxxxx'
    }),
  address: yup.string().required('Please enter address'),
  password: yup
    .string()
    .min(8, 'Password should be 8 or more characters')
    .required('Please enter password'),
  image: yup
    .mixed()
    .nullable()
    .required('file is required')
    .test(
      'FILE_FORMAT',
      'Unsupported format. The supported formats are jpg, jpeg and png.',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
    )
    .test(
      'FILE_SIZE',
      'File too big. Maximum file size is 2MB.',
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
});

const initialValues: AddAdminI = {
  firstName: '',
  lastName: '',
  roleid:0,
  email: '',
  phoneNumber: '',
  address: '',
  password: '',
  image: ''
};

const AddAdminForm: React.FC<Props> = ({ handleSubmit, isLoading }:Props) => {

  const { token } = useAuth();
  
  const [selectedValue, setSelectedValue] = useState("");

  const { data,  error, refetch } = useGetAllRoles(token);

  console.log(data?.data);

  return (
    <Box className="addAdminForm">
      <Form<AddAdminI>
      onSubmit={handleSubmit}
        validationSchema={validationSchema}
        className="addAdminForm__form"
        initialValues={initialValues}>
        <FormField.File name="image" label="Add employee photo" />
        <FormField name="firstName" label="First Name" />
        <FormField name="lastName" label="last Name" />
        <Box className="iselect">
          <Text className="select_text">Role</Text>
          <select name="roleid" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
            {data?.data.map((item: Api.RolesAndPermissions.Permission) => (
              <option key={item.roleid} value={item.roleid}>
                {item.rolename}
              </option>
            ))} 
          </select>
        </Box>
       
        <FormField name="email" label="Email Address" type="email" />
        <FormField
          placeholder="Eg, +234**********"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <FormField name="address" label="Address" />
        <FormField name="password" label="Password" type="password" />
        <Box>
          <Button disabled={isLoading} type="submit">
            Submit
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default AddAdminForm;
