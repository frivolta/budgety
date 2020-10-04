import styled from "styled-components/macro";
import { H3 } from "../../../styles";

interface StyledInputRangeProps {
  backgroundColor: string;
}

export const StyledInputRangeWrapper = styled.div`
  padding: ${(props) => props.theme.space.l} 0;
`;

export const StyledInputRange = styled.input<StyledInputRangeProps>`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: ${(props) => props.backgroundColor};
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: ${(props) => props.theme.borderRadius.circle};
    background: ${(props) => props.color};
    cursor: pointer;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: ${(props) => props.color};
    border-radius: ${(props) => props.theme.borderRadius.base};
    cursor: pointer;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
`;

export const StyledInputRangeValue = styled(H3)`
  margin: 0 0 ${(props) => props.theme.space.xl} 0;
`;
