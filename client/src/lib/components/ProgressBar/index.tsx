import React from "react";
import {
  ProgressBarContainer,
  ProgressBarFiller,
  ProgressBarLabel,
  ProgressBarWrapper,
} from "./styled";

interface Props {
  background: string;
  color: string;
  completed: number;
  label: string;
}

export const ProgressBar = ({ background, color, completed, label }: Props) => {
  return (
    <ProgressBarWrapper>
      <ProgressBarLabel>{`${label}%`}</ProgressBarLabel>
      <ProgressBarContainer background={background}>
        <ProgressBarFiller
          background={color}
          completed={completed}
        ></ProgressBarFiller>
      </ProgressBarContainer>
    </ProgressBarWrapper>
  );
};
