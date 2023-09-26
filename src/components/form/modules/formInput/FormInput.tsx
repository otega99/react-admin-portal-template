import { ErrorMsg, LabelText } from '../../components';
import { ErrorMessage, Field } from 'formik';
import { FormInputI } from '../../types/formTypes';
import cs from 'classnames';
import './formInput.scss';

const FormInput: React.FC<FormInputI> = ({
  name,
  placeholder,
  label,
  type = 'text',
  className,
  inputRef
}) => {
  const classes = cs('formInput', {
    [`${className}`]: className
  });

  return (
    <div className={classes} data-testid="formInput">
      {label && <LabelText id={name}>{label}</LabelText>}
      <Field
        name={name}
        id={name}
        type={type}
        className="formInput__input"
        placeholder={placeholder}
        innerRef={inputRef}
      />
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default FormInput;
