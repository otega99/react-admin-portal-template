/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { FormikConfig, FormikProps, FormikValues } from 'formik';
import React, { ReactNode } from 'react';
import { StepperComponentI } from '../modules/multiStepWrapper/MultiStepWrapper';

export interface FormContainerI<T extends FormikValues = FormikValues> extends FormikConfig<T> {
  // eslint-disable-next-line no-unused-vars
  children?: React.ReactNode | ((props: FormikProps<T>) => ReactNode);
  className?: string;
}

export interface MultiStepWrapperI<T extends FormikValues = FormikValues> extends FormikConfig<T> {
  children: React.ReactNode;
  stepperComponent?: React.FC<StepperComponentI>;
  isLoading?: boolean;
  className?: string;
  formNavigationClasses?: string;
}

export interface FormStepI<T extends FormikValues = FormikValues>
  extends Pick<FormikConfig<T>, 'onSubmit'> {
  stepName: string;
  validationSchema: any;
  onSubmit: (values: T) => void;
  children: JSX.Element;
}

export interface FormInputI {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  className?: string;
  inputRef?: React.Ref<any>;
}

export interface FormInputPlainI {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  className?: string;
  inputRef?: React.Ref<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface OtpFieldI {
  name: string;
  length?: number;
  verifyStatus?: boolean | null;
  label?: string;
}

export interface FormPlacesI {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  inputRef?: React.Ref<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormTextareaI {
  name: string;
  placeholder?: string;
  label?: string;
  cols?: number;
  rows?: number;
  className?: string;
}

export interface FormRadioI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
}

export interface FormSelectI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
  emptyOptionText?: string;
}

export interface FormDropdownI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
  emptyOptionText?: string;
}

export interface FormCheckboxI {
  name: string;
  label: string;
  className?: string;
}

export interface FormCheckboxGroupI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
}

export interface FormFileI {
  label?: string;
  className?: string;
  name: string;
}
