import React from "react";
import { UserAuth } from "../../../types";
import { GridContainer, GridHeader, GridMain, GridFooter } from "./styled";

interface Props {
  children: React.ReactNode;
  user: UserAuth;
}

export const GridPageLayout = ({ children, user }: Props) => {
  return (
    <GridContainer>
      <GridHeader isAuthorized={user.authenticated} user={user} />
      <GridMain>{children}</GridMain>
      <GridFooter />
    </GridContainer>
  );
};
