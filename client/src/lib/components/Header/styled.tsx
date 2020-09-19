import styled from "styled-components";

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
  font-size: ${(props) => props.theme.fonts.header.size};
  font-weight: ${(props) => props.theme.fonts.header.weight};
  background-color: ${(props) => props.theme.colors.componentBackground};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  padding: ${(props) => props.theme.space.xl};
  color: ${(props) => props.theme.colors.primaryDarkColor};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => (props.fixedTop ? HEADER_MODIFIERS.fixedTop : null)};
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLogo = styled.img`
  max-width: 35px;
`;

export const HeaderMenu = styled.div`
  margin-left: ${(props) => props.theme.space.xxl};
  a {
    color: ${(props) => props.theme.colors.primaryDarkColor};
    text-decoration: none;
    opacity: 0.3;
    transition: opacity 0.3s;
    padding: 0 ${(props) => props.theme.space.m};
    :hover {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
`;
