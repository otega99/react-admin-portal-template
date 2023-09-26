import { Formik, Form, FormikValues, FormikProps } from 'formik';
import { FormContainerI } from '../../types/formTypes';
import cs from 'classnames';
import styles from './formContainer.module.scss';
import { ReactNode } from 'react';

// eslint-disable-next-line no-unused-vars
type FuncType = <T>(formikProps: FormikProps<T>) => ReactNode | ReactNode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFunction = (value: any): value is FuncType => {
  return typeof value === 'function';
};

const FormContainer = <T extends FormikValues = FormikValues>({
  validationSchema,
  initialValues,
  onSubmit,
  children,
  validateOnChange = true,
  validateOnBlur = true,
  className,
  ...props
}: FormContainerI<T>) => {
  const classes = cs(styles.formContainer, {
    [`${className}`]: className
  });
  if (isFunction(children)) {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={validateOnChange} // if false, it will prevent the form fields to be validated onChange
        validateOnBlur={validateOnBlur}
        {...props}>
        {(formikProps) => <Form className={classes}>{children(formikProps)}</Form>}
      </Formik>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={validateOnChange} // if false, it will prevent the form fields to be validated onChange
      validateOnBlur={validateOnBlur} // if false, it will prevent the form fields to be validated onBlur
      {...props}>
      <Form className={classes}>{children as ReactNode}</Form>
    </Formik>
  );
};

export default FormContainer;
