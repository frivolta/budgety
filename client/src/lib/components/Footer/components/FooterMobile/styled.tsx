import styled from "styled-components";
import { mediaQueries } from "../../../../../styles";

export const StyledFooterMobile = styled.div`
  display: flex;
  @media ${mediaQueries.tablet} {
    display: none;
  }
`;
