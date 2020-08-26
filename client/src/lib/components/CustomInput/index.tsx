import React from "react";
import { InputContainer, InputLabel, InputField, InputError } from "./styled";
import { CustomInputProps } from "./types";

export const Input: React.FC<CustomInputProps> = (props) => {
  const {
    name,
    type,
    value,
    handleBlur,
    handleChange,
    placeholder,
    disabled,
    hasErrors,
    errorMessage,
    label,
  } = props;

  const labelElement = label ? (
    <InputLabel htmlFor={name}>{label} </InputLabel>
  ) : null;

  const inputErrorElement = hasErrors ? (
    <InputError data-testid="InputError">{errorMessage}</InputError>
  ) : null;

  return (
    <InputContainer>
      {labelElement}
      <InputField
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
        data-testid="Input"
        hasErrors={hasErrors}
      />
      {inputErrorElement}
    </InputContainer>
  );
};
