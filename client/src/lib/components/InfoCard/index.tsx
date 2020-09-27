import React from "react";
import { InfoCardTitle, InfoCardWrapper } from "./styled";

interface Props {
  children: React.ReactChild;
  iconComponent: React.ReactChild;
}
export const InfoCard = ({ children, iconComponent }: Props) => {
  return (
    <InfoCardWrapper data-testid="InfoCard">
      <InfoCardTitle>{iconComponent}</InfoCardTitle>
      {children}
    </InfoCardWrapper>
  );
};
