import { ErrorMsg, LabelText } from '../../components';
import { ErrorMessage, Field } from 'formik';
import { FormTextareaI } from '../../types/formTypes';
import cs from 'classnames';
import './formTextarea.scss';

const FormTextarea: React.FC<FormTextareaI> = ({
  name,
  placeholder,
  label,
  cols = 20,
  rows = 5,
  className
}) => {
  const classes = cs('formTextarea', {
    [`${className}`]: className
  });
  return (
    <div className={classes}>
      {label && <LabelText id={name}>{label}</LabelText>}
      <Field
        className="formTextarea__input"
        as="textarea"
        name={name}
        id={name}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default FormTextarea;
