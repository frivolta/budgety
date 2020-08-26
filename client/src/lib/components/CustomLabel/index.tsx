import React from "react";
import { theme } from "../../../styles/Theme";
import { Label } from "./styled";

interface Props {
  children: React.ReactNode;
  type?: string;
}

const defineLabelColor = (type?: string): string => {
  switch (type) {
    case "error":
      return "red";
    default:
      return theme.colors.darkPrimary;
  }
};

export const CustomLabel: React.FC<Props> = ({ children, type }) => {
  return (
    <Label color={type ? defineLabelColor(type) : defineLabelColor()}>
      {children}
    </Label>
  );
};
