import { Box, Button, Form, FormField } from 'components';
import React from 'react';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { userSchema } from 'validations';

interface Props {
  handleSubmit: (
    // eslint-disable-next-line no-unused-vars
    values: UserVerifyMailI,
    // eslint-disable-next-line no-unused-vars
    helpers: FormikHelpers<UserVerifyMailI>
  ) => Promise<void>;
  handleBack: () => void;
  isLoading: boolean;
}

export interface UserVerifyMailI {
  otp: string;
  password: string;
  confirmPassword: string;
}

const initialValues: UserVerifyMailI = {
  otp: '',
  confirmPassword: '',
  password: ''
};

const validationSchema = yup.object().shape({
  otp: userSchema.otp,
  password: userSchema.password,
  confirmPassword: userSchema.confirmPwd
});

const VerifyMailForm: React.FC<Props> = ({ handleSubmit, handleBack, isLoading }) => {
  return (
    <Form<UserVerifyMailI>
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="forgotPwd__form"
      initialValues={initialValues}>
      <Box className="forgotForm__otpDiv">
        {/* <FormField.OtpField name="otp" /> */}
        <FormField name="otp" label="OTP" />
        <FormField name="password" type="password" label="Password" />
        <FormField name="confirmPassword" type="password" label="Confirm Password" />
      </Box>
      <Box className="forgotPwd__resendDiv">
        <Button type="button" variant="plain" className="forgotPwd__ResendBtn">
          Resend code
        </Button>
      </Box>
      <Box className="forgotPwd__btnDiv back">
        <Button onClick={handleBack} type="button">
          Go Back
        </Button>
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </Box>
    </Form>
  );
};

export default VerifyMailForm;
