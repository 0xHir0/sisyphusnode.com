import React from 'react';
import './Button.scss';

const Button = ({ className, title, handleClick }) => {
  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {title}
    </button>
  );
};

export default Button;
