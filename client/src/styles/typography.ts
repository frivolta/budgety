import styled from "styled-components";
export const primaryFont = '"Poppins", sans-serif';
export type TypographyProps = {
  color?: string;
  size?: string;
  weight?: string;
};

export const typeScale = {
  header1: "1.8rem",
  header2: "1.6rem",
  header3: "1.4rem",
  header4: "1.2rem",
  header5: "1.1rem",
  paragraph: "1rem",
  helperText: "0.8rem",
  copyrightText: "0.7rem",
};

// Define typography styles
export const H1 = styled.h1<TypographyProps>`
  font-size: ${typeScale.header1};
  line-height: 42px;
  font-weight: 700;
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const H2 = styled.h2<TypographyProps>`
  font-size: ${typeScale.header2};
  font-weight: ${(props) => (props.weight ? props.weight : "bold")};
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const H3 = styled.h3<TypographyProps>`
  font-size: ${typeScale.header3};
  font-weight: ${(props) => (props.weight ? props.weight : "bold")};
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const H4 = styled.h4<TypographyProps>`
  font-size: ${typeScale.header4};
  font-weight: ${(props) => (props.weight ? props.weight : "bold")};
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const H5 = styled.h5<TypographyProps>`
  font-size: ${typeScale.header5};
  font-weight: ${(props) => (props.weight ? props.weight : "bold")};
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const H6 = styled.h6<TypographyProps>`
  font-size: ${typeScale.helperText};
  font-weight: ${(props) => (props.weight ? props.weight : "bold")};
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const Text = styled.p`
  font-size: ${typeScale.paragraph};
`;

export const Span = styled.span<TypographyProps>`
  color: ${(props) =>
    props.color ? props.color : props.theme.colors.primaryDarkColor};
`;

export const Small = styled.small`
  font-size: ${typeScale.copyrightText};
`;
