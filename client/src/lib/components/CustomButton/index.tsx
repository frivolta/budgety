import React from "react";
import { ButtonProps } from "./types";
import { StyledButton, ButtonIcon, ButtonLabel } from "./styled";
import Spinner from "react-svg-spinner";

export const CustomButton: React.FC<ButtonProps> = (props) => {
  const { handleClick, disabled, margin, isLoading, icon, text } = props;

  const buttonIconElement = icon ? (
    <ButtonIcon src={icon} alt="button icon" />
  ) : null;

  const buttonLabelElement =
    !isLoading && text ? <ButtonLabel>{text}</ButtonLabel> : null;

  const buttonLoadingElement = isLoading ? (
    <ButtonLabel>
      <Spinner
        color="white"
        thickness={3}
        speed="slow"
        size="15px"
        data-testid="Spinner"
      />
    </ButtonLabel>
  ) : null;

  return (
    <StyledButton
      onClick={handleClick}
      disabled={disabled || isLoading}
      data-testid="CustomButton"
      margin={margin}
    >
      {buttonIconElement}
      {buttonLabelElement}
      {buttonLoadingElement}
    </StyledButton>
  );
};
