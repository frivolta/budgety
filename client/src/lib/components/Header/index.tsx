import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../types";
import brandLogo from "./assets/images/brand.svg";
import { HeaderUser } from "./components";
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  HeaderMenu,
} from "./styled";
interface Props {
  isAuthorized: boolean;
  user?: UserAuth;
  fixedTop?: boolean;
}

export const Header: React.FC<Props> = ({ isAuthorized, fixedTop, user }) => {
  const headerUser: UserAuth = user
    ? user
    : { email: "", authenticated: isAuthorized };

  const appMenuElement = isAuthorized ? (
    <HeaderMenu data-testid="HeaderMenu">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/budget-settings">Budget Settings</Link>
      <Link to="/categories">Categories</Link>
    </HeaderMenu>
  ) : null;

  const userMenuElement = isAuthorized ? (
    <HeaderUser user={headerUser} />
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
