import React from "react";
import { StyledFormGroup } from "./styled";

interface Props {
  children: React.ReactNode;
}

export const FormGroup = ({ children }: Props) => {
  return <StyledFormGroup>{children}</StyledFormGroup>;
};
