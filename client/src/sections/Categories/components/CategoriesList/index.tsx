import React from "react";
import { ActionCard } from "../../../../lib/components/ActionCard";
import { useCategories } from "../../../../lib/hooks/useCategories";
import { useTheme } from "styled-components";
import { H3 } from "../../../../styles";
import { updateCategory } from "../../../../lib/api/queries";
import { changeCategoryType } from "../../../../lib/utils/categories";
import { Category } from "../../../../types";
import { Theme } from "react-select/src/types";
import { StyledCategoriesListColumn, StyledCategoriesListRow } from "./styled";

interface Props {
  currentUserId: string;
}

export const CategoriesList = ({ currentUserId }: Props) => {
  const { categories, categoriesIsLoading } = useCategories({
    currentUserId,
  });
  const theme = useTheme() as Theme;

  const handleChangeCategoryBudgetType = async (
    category: firebase.firestore.DocumentData
  ) => {
    const documentId = category.id;
    delete category.id;
    const updatedCategory = changeCategoryType(category as Category);
    await updateCategory(currentUserId, documentId, updatedCategory);
  };

  const expenseListElement = categories
    ? categories
        .filter((category) => category.expenseType === 1)
        .map((category) => (
          <StyledCategoriesListColumn>
            <ActionCard
              budgetType={category.budgetType}
              categoryName={category.caption}
              handleClick={() => handleChangeCategoryBudgetType(category)}
            />
          </StyledCategoriesListColumn>
        ))
    : null;
  const incomeListElement = categories
    ? categories
        .filter((category) => category.expenseType === 2)
        .map((category) => (
          <StyledCategoriesListColumn>
            <ActionCard
              budgetType={category.budgetType}
              categoryName={category.caption}
              handleClick={() => handleChangeCategoryBudgetType(category)}
            />
          </StyledCategoriesListColumn>
        ))
    : null;

  if (categoriesIsLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <>
      <H3>Expenses</H3>
      <StyledCategoriesListRow>{expenseListElement}</StyledCategoriesListRow>

      <H3>Incomes</H3>
      <StyledCategoriesListRow>{incomeListElement}</StyledCategoriesListRow>
    </>
  );
};
