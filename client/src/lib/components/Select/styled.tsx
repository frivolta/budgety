import styled from "styled-components";

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
  border-radius: ${(props) => props.theme.borderRadius.base};
  height: 50px;
`;
