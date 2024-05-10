import React from 'react';

const Input = ({ type, name, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className='inputC'
      placeholder={placeholder}


    />
  );
};

export default Input;
