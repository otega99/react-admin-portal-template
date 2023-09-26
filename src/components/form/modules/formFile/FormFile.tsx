import { useState } from 'react';
import { ErrorMsg } from '../../components';
import { ErrorMessage, Field, FieldProps } from 'formik';
import cs from 'classnames';
import { FormFileI } from '../../types/formTypes';
import './formFile.scss';

import './formFile.scss';
import { Box } from 'components/box';
import { LShape } from 'assets';

const FormFile: React.FC<FormFileI> = ({ label, className, name }) => {
  const classes = cs('formFile', {
    [`${className}`]: className
  });

  return (
    <div className={classes}>
      {/* {label && <LabelText id={name}>{label}</LabelText>} */}
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          return (
            <Box as="label" className="formFile__box">
              {field.value && <Preview file={field.value} />}
              {!field.value && <img src={LShape} alt="logo" />}
              <input
                className="formFile__input"
                type="file"
                //   id={item.id}
                //   {...field}
                onChange={(e) => {
                  if (e.target.files) {
                    form.setFieldValue(name, e.target.files[0]);
                  }
                }}
              />
              <span>{label}</span>
            </Box>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorMsg} />
    </div>
  );
};

export default FormFile;

interface PreviewI {
  file: File;
}

const Preview: React.FC<PreviewI> = ({ file }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  // console.log(preview, 'preview');

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div className="filePreview">
      <img className="filePreview__img" src={preview ? (preview as string) : undefined} alt="" />
    </div>
  );
};
