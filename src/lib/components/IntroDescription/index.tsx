import React from "react";
import {
  StyledIntroDescriptionText,
  StyledIntroDescriptionWrapper,
  StyledIntroDescriptionImage,
} from "./styled";

interface Props {
  image?: string;
  description: string;
}

export function IntroDescription({ image, description }: Props) {
  const imageElement = image ? (
    <StyledIntroDescriptionImage src={image} alt={description} />
  ) : null;

  return (
    <StyledIntroDescriptionWrapper>
      {imageElement}
      <StyledIntroDescriptionText>{description}</StyledIntroDescriptionText>
    </StyledIntroDescriptionWrapper>
  );
}
