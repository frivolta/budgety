import React, { FC } from "react";
import { StyledCard, StyledCardContent } from "./styled";

interface Props {
  children: React.ReactNode;
  height?: string;
  margin?: string;
  size?: "small" | "regular";
  handleCLick?: () => void;
}

export const Card: FC<Props> = ({ children, height, margin, size }: Props) => {
  return (
    <StyledCard height={height} margin={margin}>
      <StyledCardContent size={size}>{children}</StyledCardContent>
    </StyledCard>
  );
};
