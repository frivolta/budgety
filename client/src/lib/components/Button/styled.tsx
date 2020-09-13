import styled from "styled-components";

export interface ButtonProps {
  isLoading?: boolean;
  margin?: string;
  width?: string;
}

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.primaryFont};
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.primaryColor};
  box-shadow: ${(props) => props.theme.shadows.small};
  border-radius: ${(props) => props.theme.borderRadius.base};
  color: ${(props) => props.theme.colors.textColorPrimary};
  width: ${(props) => (props.width ? props.width : `100%`)};
  padding: ${(props) => props.theme.space.xl};
  margin: ${(props) =>
    props.margin ? props.margin : `${props.theme.space.xl} 0`};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  transition: all ease-out 0.5s;
  border: none;
  :hover {
    opacity: ${(props) => (props.disabled ? "0.4" : "0.8")};
    transition: all ease-out 0.5s;
  }
`;

export const ButtonLabel = styled.span`
  margin-top: 1px;
`;

export const ButtonIcon = styled.img`
  margin-top: 1px;
`;
