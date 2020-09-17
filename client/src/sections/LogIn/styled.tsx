import styled from "styled-components";
import { Span } from "../../styles/typography";

export const LogInCardSpan = styled(Span)`
  color: ${(props) => props.theme.colors.primaryColor};
`;

export const BrandLogo = styled.img`
  width: ${(props) => props.theme.space.xxl}*2;
`;
