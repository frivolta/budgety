import React, { FC } from "react";
import { StyledCard, StyledCardContent } from "./styled";

interface Props {
  children: React.ReactNode;
}

export const Card: FC<Props> = ({ children }) => {
  return (
    <StyledCard>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};
