import React, { FC } from "react";
import ReactLoading from "react-loading";
import { StyledLoadingContainer } from "./styled";
import { H4 } from "../../../styles/typography";
import { defaultTheme } from "../../../styles/themes";

interface Props {
  loadingText: string;
}

export const LoadingScreen: FC<Props> = ({ loadingText }) => {
  return (
    <StyledLoadingContainer>
      <ReactLoading type={"bubbles"} color={defaultTheme.colors.primaryColor} />
      <H4>{loadingText}</H4>
    </StyledLoadingContainer>
  );
};
