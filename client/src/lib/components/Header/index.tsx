import React from "react";
import { Link } from "react-router-dom";
import { User } from "firebase";
import brandLogo from "./assets/images/brand.svg";
import { HeaderMobile, HeaderUser } from "./components";
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  HeaderMenu,
} from "./styled";

interface Props {
  isAuthorized: boolean;
  sectionName: string;
  user?: User;
  fixedTop?: boolean;
}

export const Header: React.FC<Props> = ({ fixedTop, user, sectionName }) => {
  const appMenuElement = user ? (
    <>
      <HeaderMenu data-testid="HeaderMenu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/budget-settings">Budget Settings</Link>
        <Link to="/categories">Categories</Link>
      </HeaderMenu>
      <HeaderMobile data-testid="HeaderMobile" sectionName={sectionName} />
    </>
  ) : null;

  const userMenuElement = user ? <HeaderUser user={user} /> : null;

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
