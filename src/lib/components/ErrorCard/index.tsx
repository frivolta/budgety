import React from "react";
import { StyledErrorCardText, StyledErrorCardWrapper } from "./styled";

interface Props {
  errorMessage: string;
}

export const ErrorCard = ({ errorMessage }: Props) => {
  return (
    <StyledErrorCardWrapper>
      <StyledErrorCardText>{errorMessage}</StyledErrorCardText>
    </StyledErrorCardWrapper>
  );
};
