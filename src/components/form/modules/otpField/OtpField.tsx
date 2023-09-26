import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import { Box, Text } from 'components';
import './otpField.scss';
import { OtpFieldI } from '../../types/formTypes';
import { LabelText } from '../../components';

const OtpField: React.FC<OtpFieldI> = ({ name, length = 4, verifyStatus, label }) => {
  const [otpState, setOtpState] = useState(new Array(length).fill(''));
  const [otpString, setOtpString] = useState('');

  const field = useField(name);

  // effect to change state to string
  useEffect(() => {
    if (otpState) {
      setOtpString(otpState.join(''));
    }
  }, [otpState]);

  // effect to save to formik state
  useEffect(() => {
    field[2].setValue(otpString);
  }, [otpString]);

  //   change function for otp inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(e.target.value))) {
      return false;
    }

    setOtpState([...otpState.map((item, i) => (i === index ? e.target.value : item))]);

    // focus next input
    if (e.target.nextSibling) {
      (e.target.nextSibling as HTMLElement).focus();
    }
  };

  const classes = cs('otpField__input', {
    'ss-field--invalid': (field[1].touched && field[1].error) || verifyStatus === false
  });

  return (
    <div>
      {label && <LabelText id={name}>{label}</LabelText>}
      <div className="otpField">
        {otpState.map((item, index) => (
          <input
            className={classes}
            value={item}
            key={index}
            type="text"
            name="otp-field-input"
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {/* {field[1].touched && field[1].error && (
        // <FormFieldError textCenter error={field[1].error} />
      )} */}
      {verifyStatus === false && (
        <Box className="ss-flex ss-justify-center ss-item-center">
          <Text className="ss-text-negative-100">The code you&apos;ve entered is wrong</Text>
        </Box>
      )}
    </div>
  );
};

export default OtpField;
