import React from "react";
import { InfoCardTitle, InfoCardWrapper } from "./styled";

interface Props {
  children: React.ReactChild;
  iconComponent: React.ReactChild;
}
export const InfoCard = ({ children, iconComponent }: Props) => {
  return (
    <InfoCardWrapper>
      <InfoCardTitle>{iconComponent}</InfoCardTitle>
      {children}
    </InfoCardWrapper>
  );
};
