import React, { FC } from "react";
import { StyledCard, StyledCardContent } from "./styled";

interface Props {
  children: React.ReactNode;
  height?: string;
  margin?: string;
  size?: "small" | "regular";
  handleCLick?: () => void;
  backgroundColor?: string;
}

export const Card: FC<Props> = ({
  children,
  height,
  margin,
  size,
  backgroundColor,
}: Props) => {
  return (
    <StyledCard
      height={height}
      margin={margin}
      backgroundColor={backgroundColor}
    >
      <StyledCardContent size={size}>{children}</StyledCardContent>
    </StyledCard>
  );
};
