import React from "react";
import { ActionCardTitle, ActionCardWrapper } from "./styled";

interface Props {
  color: string;
  title: string;
  iconComponent: string;
  onClick?: () => void;
}

export const ActionCard = ({ color, title, iconComponent, onClick }: Props) => {
  const inactiveCardElement = (
    <ActionCardWrapper data-testid="ActionCard" color={color} onClick={onClick}>
      <ActionCardTitle>{iconComponent}</ActionCardTitle>
      {title}
    </ActionCardWrapper>
  );

  return <>{inactiveCardElement}</>;
};
