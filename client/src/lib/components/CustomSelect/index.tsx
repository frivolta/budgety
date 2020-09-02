import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { theme } from "../../../styles/Theme";

interface Props {
  name: string;
  options: Option[];
  selectCallback?: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

export const SelectField = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 14px 0px;
  width: 100%;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.colors.primaryColor};
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right #ddd;
  background-position-x: 95%;
  border-radius: ${(props) => props.theme.misc.borderRadius};
  height: 50px;
`;

export const CustomSelect = ({ name, options, selectCallback }: Props) => {
  // can pass 'props' into useField also, if 'props' contains a name attribute
  const [field, meta, helpers] = useField((name = name));
  const { setValue, setTouched, setError } = helpers;

  const setFieldProps = (
    selectedOption: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue(selectedOption.target.value);
    setTouched(true);
    setError(undefined);
  };

  const selectElement = options ? (
    <SelectField
      onChange={(option) => setFieldProps(option)}
      defaultValue={options[0].value}
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
