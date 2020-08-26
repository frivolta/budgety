import styled from "styled-components";

export const Label = styled.span<{ color: string }>`
  font-family: ${(props) => props.theme.fonts[0]};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 300;
  color: ${(props) => props.color};
  a {
    color: ${(props) => props.theme.colors.altColor};
    font-weight: 700;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;
