import React from "react";
import { useCategories } from "../../../../lib/hooks/useCategories";

interface Props {
  currentUserId: string;
}

export const CategoriesList = ({ currentUserId }: Props) => {
  const { categories, categoriesIsLoading } = useCategories({
    currentUserId,
  });

  return <p>Categories list for id: {currentUserId}</p>;
};
