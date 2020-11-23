import React from "react";
import { InfoCardTitle, InfoCardWrapper } from "./styled";

interface Props {
  children: React.ReactChild;
  iconComponent?: React.ReactChild;
  title?: string;
}
export const InfoCard = ({ children, iconComponent, title }: Props) => {
  return (
    <InfoCardWrapper data-testid="InfoCard">
      <InfoCardTitle>
        {iconComponent} {title}
      </InfoCardTitle>
      {children}
    </InfoCardWrapper>
  );
};
