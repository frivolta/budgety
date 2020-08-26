import React from "react";
import { FullPageWrapper, FullPageContent } from "./styled";

interface Props {
  children: React.ReactNode;
}

export const FullPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <FullPageWrapper role="main">
      <FullPageContent>{children}</FullPageContent>
    </FullPageWrapper>
  );
};
