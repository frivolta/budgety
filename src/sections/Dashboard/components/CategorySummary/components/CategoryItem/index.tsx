import React from "react";
import { formatPrice } from "../../../../../../lib/utils/format";
import {
  CategoryColorWrapper,
  CategoryItemAmount,
  CategoryItemColor,
  CategoryItemName,
  CategoryItemWrapper,
} from "./styled";

interface Props {
  categoryName: string;
  color: string;
  amount: number;
  isIncome: boolean;
}

export const CategoryItem = ({
  categoryName,
  color,
  amount,
  isIncome,
}: Props) => {
  return (
    <CategoryItemWrapper>
      <CategoryColorWrapper>
        <CategoryItemColor color={color} />
        <CategoryItemName>{categoryName}:</CategoryItemName>
      </CategoryColorWrapper>
      <CategoryItemAmount>
        {isIncome ? "+" : "-"}
        {formatPrice(amount.toString())}
      </CategoryItemAmount>
    </CategoryItemWrapper>
  );
};
