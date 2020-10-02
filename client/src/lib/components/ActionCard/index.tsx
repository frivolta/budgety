import React from "react";
import { getBudgetTypeById } from "../../utils/categories";
import {
  ActionCardContainer,
  ActionCardName,
  ActionCardTag,
  ActionCardWrapper,
} from "./styled";

interface Props {
  budgetType: number;
  categoryName: string;
  handleClick: () => void;
}

export const ActionCard = ({
  budgetType,
  categoryName,
  handleClick,
}: Props) => {
  const budgetTag = getBudgetTypeById(budgetType);

  return (
    <ActionCardWrapper onClick={handleClick}>
      <ActionCardContainer>
        <ActionCardTag type={budgetType}>
          {budgetTag?.caption || "NEEDS"}
        </ActionCardTag>
        <ActionCardName>{categoryName}</ActionCardName>
      </ActionCardContainer>
    </ActionCardWrapper>
  );
};
