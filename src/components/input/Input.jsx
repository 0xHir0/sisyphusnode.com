import React from 'react';
import './Input.scss';

const Input = ({ className, value, handleInputChange }) => {
  return (
    <input
      className={`form-control ${className}`}
      value={value}
      placeholder='Please enter node name'
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default Input;
