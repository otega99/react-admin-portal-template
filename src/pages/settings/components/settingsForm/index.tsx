import { Box, Button, Form, FormField } from 'components';
import { FormikHelpers } from 'formik';
import React from 'react';
import './settingsForm.scss';

export interface SettingsI {
  name: string;
  email: string;
  address: string;
}

interface Props {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (values: SettingsI, formikHelpers: FormikHelpers<SettingsI>) => void;
}

const initialValues: SettingsI = {
  name: '',
  email: '',
  address: ''
};

const SettingsForm: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <Box className="settingsForm">
      <Form<SettingsI>
        className="settingsForm__form"
        onSubmit={handleSubmit}
        initialValues={initialValues}>
        <FormField.File name="logo" label="Change Logo" />
        <FormField name="name" label="Company Name" />
        <FormField name="email" type="email" label="Company Email" />
        <FormField name="address" label="Office Address" />
        <Box>
          <Button type="submit">Save Changes</Button>
        </Box>
      </Form>
    </Box>
  );
};

export default SettingsForm;
