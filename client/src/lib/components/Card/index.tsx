import React, { FC } from "react";
import { StyledCard, StyledCardContent } from "./styled";

interface Props {
  children: React.ReactNode;
  height?: string;
  margin?: string;
  handleCLick?: () => void;
}

export const Card: FC<Props> = ({ children, height, margin }: Props) => {
  return (
    <StyledCard height={height} margin={margin}>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};
