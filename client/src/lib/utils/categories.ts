import { Category, CategoryType } from "../../types";
import { categoryTypes } from "../costants/categoryTypes";

export const getBudgetTypeById = (id: number): CategoryType | undefined => {
  return categoryTypes.find((category) => category.id === id);
};

export const getIdByBudgetTypeValue = (
  value: string
): CategoryType | undefined => {
  return categoryTypes.find((category) => category.value === value);
};

export const changeCategoryType = (category: Category) => {
  const budgetType = getBudgetTypeById(category.budgetType);

  if (budgetType?.value === "needs") {
    const wantsCategory = getIdByBudgetTypeValue("wants");
    const updatedCategory = {
      ...category,
      budgetType: wantsCategory ? wantsCategory.id : category.id,
    };
    return updatedCategory;
  }

  if (budgetType?.value === "wants") {
    const needsCategory = getIdByBudgetTypeValue("needs");
    const updatedCategory = {
      ...category,
      budgetType: needsCategory ? needsCategory.id : category.id,
    };
    return updatedCategory;
  }
  return category;
};
