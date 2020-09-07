import React, { FC } from "react";
import { StyledCard } from "./styled";

interface Props {
  customWidth?: number;
  customHeight?: number;
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card: FC<Props> = ({
  customWidth,
  customHeight,
  children,
  hoverable,
}) => {
  return (
    <StyledCard hoverable customHeight={customHeight} customWidth={customWidth}>
      {children}
    </StyledCard>
  );
};
