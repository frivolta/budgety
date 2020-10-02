import styled from "styled-components";

export interface StyledCurrencyInputFieldProps {
  hasErrors: boolean;
}

export const StyledCurrencyInputContainer = styled.div`
  display: flex;
  margin: 16px 0;
  justify-content: center;
  flex-direction: column;
  font-size: ${(props) => props.theme.fonts.default.size};
  color: ${(props) => props.theme.colors.lightText};
`;

export const StyledCurrencyInputField = styled.input<
  StyledCurrencyInputFieldProps
>`
  background-color: ${(props) => props.theme.colors.componentBackground};
  padding: 14px;
  border-radius: ${(props) => props.theme.borderRadius.base};
  box-shadow: none;
  border: 1px solid
    ${(props) =>
      props.hasErrors
        ? props.theme.colors.error
        : props.theme.colors.placeholder};
  color: ${(props) => props.theme.colors.lightText};
  outline: none;
  font-weight: 300;
  ::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
  }
  :focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
    transition: all 0.5s;
  }
`;

export const StyledCurrencyInputError = styled.span`
  color: ${(props) => props.theme.colors.error};
  padding-top: ${(props) => props.theme.space.m};
  font-size: ${(props) => props.theme.fonts.small.size};
  font-weight: ${(props) => props.theme.fonts.small.weight};
`;

export const StyledCurrencyInputLabel = styled.label`
  font-size: ${(props) => props.theme.fonts.default.size};
  font-weight: ${(props) => props.theme.fonts.default.tertiaryWeight};
  color: ${(props) => props.theme.colors.lightText};
  padding-bottom: ${(props) => props.theme.fonts.default.size};
`;
