import React from 'react';
import './Input.scss';

const Input = ({
  className,
  value,
  minLength,
  maxLength,
  handleInputChange,
}) => {
  return (
    <input
      className={`form-control ${className}`}
      value={value}
      placeholder='Please enter node name'
      minLength={minLength}
      maxLength={maxLength}
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default Input;
