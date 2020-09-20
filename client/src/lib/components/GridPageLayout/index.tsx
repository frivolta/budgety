import React from "react";
import { UserAuth } from "../../../types";
import { GridContainer, GridHeader, GridMain, GridFooter } from "./styled";

interface Props {
  children: React.ReactNode;
  user: UserAuth;
  sectionName: string;
}

export const GridPageLayout = ({ children, user, sectionName }: Props) => {
  return (
    <GridContainer>
      <GridHeader
        isAuthorized={user.authenticated}
        user={user}
        sectionName={sectionName}
      />
      <GridMain>{children}</GridMain>
      <GridFooter />
    </GridContainer>
  );
};
