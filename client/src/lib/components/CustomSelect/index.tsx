import React from "react";
import { SelectField } from "./styled";

interface Props {
  name: string;
  options: Option[];
  register?: any;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface Option {
  value: string;
  label: string;
}

export const CustomSelect = ({ name, options, register, onChange }: Props) => {
  return (
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
  );
};
