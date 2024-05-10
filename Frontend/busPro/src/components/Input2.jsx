import React from 'react';

const Input2 = ({ type, name, value, onChange, placeholder }) => {
  return (
    <>
    <input  
    type={type}
    name={name} 
    value = {value}
    onChange={onChange}
    className="input_2" />
    <label class="user-label">{placeholder}</label>
    </>
  );
};

export default Input2;
