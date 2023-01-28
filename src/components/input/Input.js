import React from 'react';

//--- Import Style File
import "./input.scss";

const Input = ({input, placeholder, value, onChange}) => {
  return (
    <input
      type={input}
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (e) => onChange(e) : null}
    />
  );
}

export default Input;
