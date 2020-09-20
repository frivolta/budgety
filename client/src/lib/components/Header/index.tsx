import React from "react";
import { Link } from "react-router-dom";
import { H1 } from "../../../styles";
import { UserAuth } from "../../../types";
import brandLogo from "./assets/images/brand.svg";
import { HeaderUser } from "./components";
import {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  HeaderMenu,
  HeaderMobileTitle,
} from "./styled";
interface Props {
  isAuthorized: boolean;
  sectionName: string;
  user?: UserAuth;
  fixedTop?: boolean;
}

export const Header: React.FC<Props> = ({
  isAuthorized,
  fixedTop,
  user,
  sectionName,
}) => {
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

  //@ToDo: add icon for menu, settings
  //@ToDo: add bottom menu
  const mobileElements = (
    <HeaderMobileTitle>
      <H1>{sectionName}</H1>
    </HeaderMobileTitle>
  );
  return (
    <HeaderWrapper fixedTop={fixedTop}>
      <HeaderContainer>
        <Link to="/">
          <HeaderLogo src={brandLogo} alt="Budgety" data-testid="HeaderLogo" />
        </Link>
        {appMenuElement}
        {mobileElements}
      </HeaderContainer>
      {userMenuElement}
    </HeaderWrapper>
  );
};
