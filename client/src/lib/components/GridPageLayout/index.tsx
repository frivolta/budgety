import React from "react";
import { GridContainer, GridHeader, GridMain, GridFooter } from "./styled";
import { User } from "firebase";

interface Props {
  children: React.ReactNode;
  user: User;
  sectionName: string;
}

export const GridPageLayout = ({ children, user, sectionName }: Props) => {
  return (
    <GridContainer>
      <GridHeader isAuthorized={!!user} user={user} sectionName={sectionName} />
      <GridMain>{children}</GridMain>
      <GridFooter />
    </GridContainer>
  );
};
