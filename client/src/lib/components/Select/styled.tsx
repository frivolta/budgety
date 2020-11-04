import styled from "styled-components";
import arrowDownElement from "./assets/images/arrow-down.svg";

export const SelectField = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 14px 0px;
  width: 100%;
  font-size: 16px;
  padding: 14px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.componentBackground};
  background-position-x: 95%;
  border-radius: ${(props) => props.theme.borderRadius.base};
  height: 50px;
  outline: none;
  background-image: url(${arrowDownElement});
  background-repeat: no-repeat;
  background-position: calc(100% - 16px);
  background-size: 16px;
  color: ${(props) => props.theme.colors.lightText};
  ::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
  }
  :focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
    transition: all 0.5s;
  }
`;
