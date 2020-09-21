import styled from "styled-components";
import { mediaQueries } from "../../../../../styles";

export const StyledFooterMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;

  @media ${mediaQueries.tablet} {
    display: none;
  }
`;

export const SyledFooterIcon = styled.div`
  cursor: pointer;
  display: flex;
  color: ${(props) => props.theme.colors.primaryColor};
  opacity: 1;
  a {
    opacity: 1;
  }
  svg {
    fill: ${(props) => props.theme.colors.primaryColor};
    opacity: 1;
  }
`;
