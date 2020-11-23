import React from "react";
import { StyledButton, ButtonIcon, ButtonLabel } from "./styled";
import Spinner from "react-svg-spinner";

export interface Props {
  handleClick?: (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
  text: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
  margin?: string;
  width?: string;
  secondary?: boolean;
}

export const Button: React.FC<Props> = (props) => {
  const {
    handleClick,
    disabled,
    margin,
    isLoading,
    icon,
    text,
    width,
    secondary,
  } = props;

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
      data-testid="Button"
      margin={margin}
      width={width}
      secondary={secondary}
    >
      {buttonIconElement}
      {buttonLabelElement}
      {buttonLoadingElement}
    </StyledButton>
  );
};
