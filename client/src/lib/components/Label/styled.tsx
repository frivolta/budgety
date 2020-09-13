import styled from "styled-components";

interface StyledLabelProps {
  color?: string;
}

export const StyledLabel = styled.span<StyledLabelProps>`
  font-family: ${(props) => props.theme.primaryFont};
  font-size: ${(props) => props.theme.fonts.default.size};
  font-weight: ${(props) => props.theme.fonts.default.weight};
  color: ${(props) =>
    props.color ? props.color : props.theme.primaryDarkColor};
  a {
    color: ${(props) => props.theme.colors.primaryColor};
    font-weight: 700;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;
