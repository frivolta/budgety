import React from "react";
import {
  StyledCustomSmallButton,
  StyledCustomSmallButtonLabel,
} from "./styled";

interface Props {
  handleClick: (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
  text: string;
  disabled?: boolean;
  margin?: string;
  inverted?: boolean;
}

export const CustomSmallButton: React.FC<Props> = ({
  handleClick,
  text,
  disabled,
  margin,
  inverted,
}) => {
  const styledCustomSmallButtonLabelelement = text ? (
    <StyledCustomSmallButtonLabel>{text}</StyledCustomSmallButtonLabel>
  ) : null;

  return (
    <StyledCustomSmallButton
      onClick={handleClick}
      disabled={disabled}
      data-testid="CustomSmallButton"
      margin={margin}
      inverted={inverted}
    >
      {styledCustomSmallButtonLabelelement}
    </StyledCustomSmallButton>
  );
};
