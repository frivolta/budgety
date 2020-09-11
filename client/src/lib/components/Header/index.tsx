import React from "react";
import brandLogo from "./assets/images/brand.svg";
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  HeaderMenu,
} from "./styled";
interface Props {
  isAuthorized: boolean;
}

export const Header: React.FC<Props> = ({ isAuthorized }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <HeaderLogo src={brandLogo} alt="Budgety" data-testid="HeaderLogo" />
        <HeaderMenu data-testid="HeaderMenu">
          <a href="/">Dashboard</a>
          <a href="/">Expenses</a>
          <a href="/">Budget Settings</a>
          <a href="/">Categories</a>
        </HeaderMenu>
      </HeaderContainer>
      <div>user</div>
    </HeaderWrapper>
  );
};
