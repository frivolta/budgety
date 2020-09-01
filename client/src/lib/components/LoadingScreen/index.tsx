import React, { FC } from "react";
import ReactLoading from "react-loading";
import { theme } from "../../../styles/Theme/index";
import { StyledLoadingContainer } from "./styled";
import { H4 } from "../../../styles/Theme/typography";

interface Props {
  loadingText: string;
}

export const LoadingScreen: FC<Props> = ({ loadingText }) => {
  return (
    <StyledLoadingContainer>
      <ReactLoading type={"bubbles"} color={theme.colors.primaryColor} />
      <H4>{loadingText}</H4>
    </StyledLoadingContainer>
  );
};
