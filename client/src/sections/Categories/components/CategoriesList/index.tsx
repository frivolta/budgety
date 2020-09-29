import React from "react";
import { ActionCard } from "../../../../lib/components/ActionCard";
import { useCategories } from "../../../../lib/hooks/useCategories";
import { useTheme } from "styled-components";
import { H3 } from "../../../../styles";
import { updateCategory } from "../../../../lib/api/queries";
import { changeCategoryType } from "../../../../lib/utils/categories";
import { toasterSuccess } from "../../../../lib/utils/toaster";
import { EDIT_CATEGORIES_SUCCESS } from "../../../../lib/messages";
import { Category } from "../../../../types";

interface Props {
  currentUserId: string;
}

export const CategoriesList = ({ currentUserId }: Props) => {
  const { categories, categoriesIsLoading } = useCategories({
    currentUserId,
  });
  const theme = useTheme() as any;

  const handleChangeCategoryBudgetType = async (
    category: firebase.firestore.DocumentData
  ) => {
    const documentId = category.id;
    delete category.id;
    const updatedCategory = changeCategoryType(category as Category);
    await updateCategory(currentUserId, documentId, updatedCategory);
  };
  // Colors
  const needsColor = theme.colors.needsColor;
  const wantsColor = theme.colors.wantsColor;
  const incomesColor = theme.colors.incomesColor;

  const expenseListElement = categories
    ? categories
        .filter((category) => category.expenseType === 1)
        .map((category) => (
          <ActionCard
            color={category.budgetType === 1 ? needsColor : wantsColor}
            title={category.caption}
            iconComponent={category.budgetType === 1 ? "NEEDS" : "WANTS"}
            onClick={() => handleChangeCategoryBudgetType(category)}
          />
        ))
    : null;
  const incomeListElement = categories
    ? categories
        .filter((category) => category.expenseType === 2)
        .map((category) => (
          <ActionCard
            color={incomesColor}
            title={category.caption}
            iconComponent="INCOME"
          />
        ))
    : null;

  if (categoriesIsLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      <H3>Expenses</H3>
      {expenseListElement}
      <H3>Incomes</H3>
      {incomeListElement}
    </>
  );
};
