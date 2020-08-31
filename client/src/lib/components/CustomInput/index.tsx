import React from "react";
import {
  StyledInputContainer,
  StyledInputLabel,
  StyledInputField,
  StyledInputError,
} from "./styled";

interface Props {
  placeholder: string;
  type: string;
  name: string;
  value: string | number;
  label?: string;
  hasErrors?: boolean;
  errorMessage?: string | undefined;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const CustomInput: React.FC<Props> = (props) => {
  const {
    label,
    name,
    type,
    value,
    handleChange,
    handleBlur,
    disabled,
    hasErrors,
    errorMessage,
    placeholder,
  } = props;

  const labelElement = label ? (
    <StyledInputLabel htmlFor={name}>{label} </StyledInputLabel>
  ) : null;

  const errorElement = hasErrors ? (
    <StyledInputError data-testid="InputError">{errorMessage}</StyledInputError>
  ) : null;

  return (
    <StyledInputContainer>
      {labelElement}
      <StyledInputField
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled ? disabled : false}
        data-testid="Input"
        hasErrors={hasErrors ? hasErrors : false}
      />
      {errorElement}
    </StyledInputContainer>
  );
};
