import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { theme } from "../../../styles/Theme";

interface Props {
  name: string;
  options: Option[];
}

interface Option {
  value: string;
  label: string;
}

export const SelectField = styled.select`
  display: flex;
  margin: 14px 0;
  width: 100%;
  padding: 0;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.colors.primaryColor};
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right #ddd;

  border-radius: ${(props) => props.theme.misc.borderRadius};
`;

export const CustomSelect = ({ name, options }: Props) => {
  // can pass 'props' into useField also, if 'props' contains a name attribute
  const [field, meta, helpers] = useField((name = "mySelectInput"));
  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (
    selectedOption: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(selectedOption.target.value);
    setValue(selectedOption.target.value);
    setTouched(true);
    setError(undefined);
  };

  const selectElement = options ? (
    <SelectField
      onChange={(option) => setFieldProps(option)}
      defaultValue={options[1].value}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectField>
  ) : null;
  return selectElement;
};
