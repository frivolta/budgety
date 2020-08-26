import styled from "styled-components";
import { CustomInputProps } from "./types";

export const InputContainer = styled.div`
  display: flex;
  margin: 16px 0;
  justify-content: center;
  flex-direction: column;
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  color: ${(props) => props.theme.colors.darkPrimary};
`;

export const InputField = styled.input<CustomInputProps>`
  padding: 14px;
  border-radius: ${(props) => props.theme.misc.borderRadius};
  box-shadow: none;
  border: 1px solid
    ${(props) => (props.hasErrors ? "red" : props.theme.colors.darkSecondary)};
  color: ${(props) => props.theme.colors.darkPrimary};
  outline: none;
  font-weight: 300;
  ::placeholder {
    color: ${(props) => props.theme.colors.darkSecondary};
  }
  :focus {
    border: 1px solid ${(props) => props.theme.colors.primaryColor};
    transition: all 0.5s;
  }
`;

export const InputError = styled.span`
  color: red;
  padding-top: 8px;
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: 500;
`;

export const InputLabel = styled.label`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 300;
  color: ${(props) => props.theme.colors.darkPrimary};
  padding-bottom: 8px;
`;
