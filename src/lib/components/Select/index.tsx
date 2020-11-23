import React from "react";
import { SelectField, StyledSelectLabel } from "./styled";

interface Props {
  name: string;
  options: Option[];
  label: string;
  register?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Option {
  value: string;
  label: string;
}

export const Select = ({ name, options, register, onChange, label }: Props) => {
  const labelElement = label ? (
    <StyledSelectLabel htmlFor={name}>{label} </StyledSelectLabel>
  ) : null;

  return (
    <>
      {labelElement}
      <SelectField
        defaultValue={options[0].value}
        name={name}
        ref={register}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
    </>
  );
};
