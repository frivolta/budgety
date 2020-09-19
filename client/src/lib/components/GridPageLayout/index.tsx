import React from "react";
import { GridContainer, GridHeader, GridMain, GridFooter } from "./styled";

interface Props {
  children: React.ReactNode;
}

export const GridPageLayout = ({ children }: Props) => {
  return (
    <GridContainer>
      <GridHeader isAuthorized={false} />
      <GridMain>{children}</GridMain>
      <GridFooter />
    </GridContainer>
  );
};
