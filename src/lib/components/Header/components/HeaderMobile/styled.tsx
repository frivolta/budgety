import styled from "styled-components";
import { mediaQueries } from "../../../../../styles";

export const HeaderMobileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  @media ${mediaQueries.tablet} {
    display: none;
  }
`;

export const HeaderMobileIcons = styled.div`
  display: flex;
`;

export const HeaderMobileTitle = styled.div`
  display: flex;
`;
