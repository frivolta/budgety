import React, { FC } from "react";
import { StyledCard, StyledCardContent } from "./styled";

interface Props {
  children: React.ReactNode;
  height?: string;
}

export const Card: FC<Props> = ({ children, height }: Props) => {
  return (
    <StyledCard height={height}>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};
