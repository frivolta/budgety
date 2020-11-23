import styled from "styled-components";
import { Span } from "../../styles/typography";

export const SignupCardSpan = styled(Span)`
  color: ${(props) => props.theme.colors.primary};
`;
export const BrandLogo = styled.img`
  width: ${(props) => props.theme.space.xxl}*2;
`;
