import React from "react";
import { StyledLabel } from "./styled";

interface Props {
  children: React.ReactNode;
  color?: string;
}

export const Label: React.FC<Props> = ({ children, color }) => {
  return (
    <StyledLabel color={color} data-testid="Label">
      {children}
    </StyledLabel>
  );
};
