import React from "react";

const customInput = (props) => {
  const { type, name, label, classname, value, onChange, onBlur, disabled} = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${classname}`}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default customInput;