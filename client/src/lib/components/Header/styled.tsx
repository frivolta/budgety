import styled from "styled-components";
import { mediaQueries } from "../../../styles";

interface HeaderWrapperProps {
  fixedTop?: boolean;
}

const HEADER_MODIFIERS = {
  fixedTop: () => `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  `,
};

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  grid-area: header;
  font-size: ${(props) => props.theme.fonts.header.size};
  font-weight: ${(props) => props.theme.fonts.header.weight};
  background-color: ${(props) => props.theme.colors.componentBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  color: ${(props) => props.theme.colors.lightText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
  ${(props) => (props.fixedTop ? HEADER_MODIFIERS.fixedTop : null)};
  @media ${mediaQueries.tabletMax} {
    background-color: ${(props) => props.theme.colors.background};
    border-bottom: none;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.space.xl};

  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderLogo = styled.img`
  max-width: 35px;
  @media ${mediaQueries.tabletMax} {
    display: none;
  }
`;

export const HeaderMenu = styled.div`
  width: 100%;
  margin-left: ${(props) => props.theme.space.xxl};
  a {
    color: ${(props) => props.theme.colors.lightText};
    text-decoration: none;
    opacity: 0.3;
    transition: opacity 0.3s;
    padding: 0 ${(props) => props.theme.space.m};
    :hover {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
  @media ${mediaQueries.tabletMax} {
    display: none;
  }
`;
