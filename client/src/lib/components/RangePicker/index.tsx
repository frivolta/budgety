import React from "react";
import { useTheme } from "styled-components/macro";
import { H2, H3 } from "../../../styles";
import { Theme } from "../../../styles/types";
import {
  StyledInputRange,
  StyledInputRangeValue,
  StyledInputRangeWrapper,
} from "./styled";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  value: number;
  step: number;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
  backgroundColor?: string;
}

export const RangePicker = ({
  min,
  max,
  value,
  step,
  name,
  handleChange,
  color,
  backgroundColor,
}: Props) => {
  const theme = useTheme() as Theme;
  const rangePickerColor = color ? color : theme.colors.primary;
  const rangePickerBackgroundColor = backgroundColor
    ? backgroundColor
    : theme.colors.primaryActive;

  return (
    <StyledInputRangeWrapper>
      <StyledInputRangeValue color={rangePickerColor}>
        {value} %
      </StyledInputRangeValue>
      <StyledInputRange
        type="range"
        value={value}
        name={name}
        step={step}
        max={max}
        min={min}
        onChange={handleChange}
        color={rangePickerColor}
        backgroundColor={rangePickerBackgroundColor}
      />
    </StyledInputRangeWrapper>
  );
};
