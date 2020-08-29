import React, { FC } from "react";
import { StyledCard } from "./styled";

interface Props {
  customWidth?: number;
  customHeight?: number;
  children: React.ReactNode;
}

export const Card: FC<Props> = ({ customWidth, customHeight, children }) => {
  return (
    <StyledCard customHeight={customHeight} customWidth={customWidth}>
      {children}
    </StyledCard>
  );
};
