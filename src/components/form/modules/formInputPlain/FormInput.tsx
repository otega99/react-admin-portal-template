import { LabelText } from '../../components';
import { FormInputPlainI } from '../../types/formTypes';
import cs from 'classnames';
import { FiSearch } from 'react-icons/fi';
import './formInput.scss';

const FormInputPlain: React.FC<FormInputPlainI> = ({
  name,
  placeholder,
  label,
  type = 'text',
  className,
  inputRef,
  onChange
}) => {
  const classes = cs('formSearch', {
    [`${className}`]: className
  });

  return (
    <div className={classes} data-testid="formSearch">
      {label && <LabelText id={name}>{label}</LabelText>}
      <div className="formSearch__inputDiv">
        <FiSearch className="formSearch__icon" />
        <input
          className="formSearch__search"
          name={name}
          id={name}
          type={type}
          placeholder={placeholder || 'Search'}
          ref={inputRef}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FormInputPlain;
