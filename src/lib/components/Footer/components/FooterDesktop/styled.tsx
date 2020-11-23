import styled from "styled-components";
import { mediaQueries } from "../../../../../styles";

export const StyledFooterDesktop = styled.div`
  display: flex;
  @media ${mediaQueries.tabletMax} {
    display: none;
  }
`;
