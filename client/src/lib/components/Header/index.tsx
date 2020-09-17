import React from "react";
import { Link } from "react-router-dom";
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
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/budget-settings">Budget Settings</Link>
      <Link to="/categories">Categories</Link>
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
        <Link to="/">
          <HeaderLogo src={brandLogo} alt="Budgety" data-testid="HeaderLogo" />
        </Link>
        {appMenuElement}
      </HeaderContainer>
      {userMenuElement}
    </HeaderWrapper>
  );
};
