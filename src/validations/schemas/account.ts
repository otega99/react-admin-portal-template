import * as yup from 'yup';

const stringSchema = yup.string().trim();

export const userSchema = {
  userName: stringSchema.required('Please enter your username.'),
  email: stringSchema.required('Please enter your email.').email('Please enter a valid email'),
  phoneNumber: stringSchema
    .required('Please enter your Phone number in this format. Eg, +234xxxxxxxx')
    .matches(/^[0-9]*$/, {
      message: 'Please enter only digits. Eg, +234xxxxxxxx'
    }),
  password: stringSchema
    .min(8, 'Password should be 8 or more characters')
    .required('Password is required'),
  confirmPwd: stringSchema
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password is required'),
  otp: stringSchema.required('Please enter your otp.')
};
