import { FormikValues } from 'formik';
import {
  FormContainer,
  FormInput,
  MultiStepWrapper,
  FormStep,
  OtpField,
  FormInputPlain,
  FormTextarea,
  FormFile
} from './modules';
import {
  FormContainerI,
  FormInputI,
  FormInputPlainI,
  FormStepI,
  MultiStepWrapperI,
  OtpFieldI,
  FormTextareaI,
  FormFileI
} from './types/formTypes';

// this is the container for the form fields
export const Form = <T extends FormikValues = FormikValues>(props: FormContainerI<T>) => (
  <FormContainer {...props} />
);
Form.MultiStep = <T extends FormikValues = FormikValues>(props: MultiStepWrapperI<T>) => (
  <MultiStepWrapper {...props} />
);
Form.Step = <T extends FormikValues = FormikValues>(props: FormStepI<T>) => <FormStep {...props} />;

// this is the formfield component. It has embedded types
const FormField = (props: FormInputI) => <FormInput {...props} />;
FormField.Plain = (props: FormInputPlainI) => <FormInputPlain {...props} />;
FormField.OtpField = (props: OtpFieldI) => <OtpField {...props} />;
FormField.TextArea = (props: FormTextareaI) => <FormTextarea {...props} />;
FormField.File = (props: FormFileI) => <FormFile {...props} />;

export default FormField;
