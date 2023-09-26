/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button } from 'components';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React, { useState } from 'react';
import { FormStepI, MultiStepWrapperI } from '../../types/formTypes';
import cs from 'classnames';
import styles from './multiStepWrapper.module.scss';

const MultiStepWrapper = <T extends FormikValues = FormikValues>({
  children,
  initialValues,
  onSubmit,
  stepperComponent,
  isLoading,
  className,
  formNavigationClasses,
  ...props
}: MultiStepWrapperI<T>) => {
  // this is the state for current steps
  const [stepNumber, setStepNumber] = useState(0);

  // new initial values based on the current step
  const [newInitialValues, setNewInitialValues] = useState(initialValues);

  //   this converts the children into an array
  const steps = React.Children.toArray(children) as React.ReactElement[];

  // step = current child
  const step = steps[stepNumber];
  // total number of steps
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  // function to trigger next
  const next = (values: T) => {
    setStepNumber(stepNumber + 1);
    setNewInitialValues(values);
  };

  // function to go back
  const prev = (values: T) => {
    setStepNumber(stepNumber - 1);
    setNewInitialValues(values);
  };

  // function to go to a step
  const goToStep = (values: T, step: number) => {
    setStepNumber(step);
    setNewInitialValues(values);
  };

  // function for handling submit
  const handleSubmit = async (values: T, helpers: FormikHelpers<T>) => {
    // if (step.props.onSubmit) {
    //   await step.props.onSubmit(values, helpers);
    // }

    if (isLastStep) {
      return onSubmit(values, helpers);
    } else {
      try {
        if (step.props.onSubmit) {
          await step.props.onSubmit(values, helpers);
        }

        helpers.setTouched({});
        next(values);
      } catch (error) {
        // console.log(error, 'jjj');
      }
    }
  };

  const validationSchema = step.props.validationSchema;

  const formClasses = cs('', {
    [`${className}`]: className
  });

  return (
    <Formik
      initialValues={newInitialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      {...props}>
      {(formik) => (
        <Form className={formClasses}>
          <Stepper<T>
            goToStep={goToStep}
            stepperComponent={stepperComponent}
            steps={steps}
            stepNumber={stepNumber}
            values={formik.values}
          />
          {step}
          <FormNavigation
            isLoading={isLoading}
            isLastStep={isLastStep}
            hasPrevious={stepNumber > 0}
            onBackClick={() => prev(formik.values)}
            className={formNavigationClasses}
          />
        </Form>
      )}
    </Formik>
  );
};

export default MultiStepWrapper;

interface FormNavigationI {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
  isLoading?: boolean | undefined;
  className?: string;
}

const FormNavigation: React.FC<FormNavigationI> = ({
  hasPrevious,
  onBackClick,
  isLastStep,
  isLoading,
  className
}) => {
  const classes = cs(styles.formNavigation, {
    [`${className}`]: className
  });
  return (
    <div className={classes}>
      {hasPrevious && (
        <Button variant="secondary" type="button" onClick={onBackClick}>
          Back
        </Button>
      )}
      <Button disabled={isLoading} loading={isLoading} type="submit">
        {isLastStep ? 'Submit' : 'Next'}
      </Button>
    </div>
  );
};

interface StepperI<T extends FormikValues = FormikValues> {
  steps: React.ReactElement[];
  stepNumber: number;
  goToStep: (values: T, step: number) => void;
  values: T;
  stepperComponent?: React.FC<StepperComponentI>;
}

export interface StepperComponentI {
  isActive: boolean;
  stepName: React.ReactNode;
}

const Stepper = <T extends FormikValues = FormikValues>({
  steps,
  stepNumber,
  stepperComponent,
  goToStep,
  values
}: StepperI<T>) => {
  const StepperComponent = stepperComponent;
  const stepperDivClasses = (isActive: boolean, isDone: boolean) =>
    cs(styles.stepper__div, {
      [`${styles.active}`]: isActive,
      [`${styles.done}`]: isDone
    });

  return (
    <div className={styles.stepper}>
      {steps.map((item, index) => {
        const stepName = item.props.stepName;
        const isActive = steps.indexOf(item) === stepNumber;
        const isDone = steps.indexOf(item) < stepNumber;

        if (StepperComponent) {
          return <StepperComponent key={index} isActive={isActive} stepName={stepName} />;
        }

        return (
          <div
            key={index}
            // onClick={() => goToStep(values, index)}
            className={stepperDivClasses(isActive, isDone)}>
            {isDone && <img src="/images/check.svg" alt="" className={styles.stepper__divIcon} />}
            {!isDone && `${index + 1}.`} {stepName}
          </div>
        );
      })}
    </div>
  );
};

export const FormStep = <T extends FormikValues = FormikValues>({
  stepName = '',
  validationSchema,
  onSubmit,
  children
}: FormStepI<T>) => children;
