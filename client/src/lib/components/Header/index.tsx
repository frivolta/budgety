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
  fixedTop?: boolean;
}

export const Header: React.FC<Props> = ({ isAuthorized, fixedTop }) => {
  const appMenuElement = isAuthorized ? (
    <HeaderMenu data-testid="HeaderMenu">
      <a href="/">Dashboard</a>
      <a href="/">Expenses</a>
      <a href="/">Budget Settings</a>
      <a href="/">Categories</a>
    </HeaderMenu>
  ) : null;

  const userMenuElement = isAuthorized ? (
    <div>Auth menu</div>
  ) : (
    <div>Not auth menu</div>
  );

  return (
    <HeaderWrapper fixedTop={fixedTop}>
      <HeaderContainer>
        <HeaderLogo src={brandLogo} alt="Budgety" data-testid="HeaderLogo" />
        {appMenuElement}
      </HeaderContainer>
      {userMenuElement}
    </HeaderWrapper>
  );
};
