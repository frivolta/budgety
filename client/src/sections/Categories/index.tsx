import React, { FC } from "react";
import { GridLayout, ActionCard } from "../../lib/components";
import useAuthContext from "../../lib/auth/useAuthContext";
import { firestore } from "../../lib/api/firebase";
import { Category } from "../../types";
import { CategoriesList } from "./components";

export const Categories: FC = () => {
  const [currentUser, isLoading] = useAuthContext();

  const categoriesListElement =
    currentUser && currentUser.uid && !isLoading ? (
      <CategoriesList userUid={currentUser.uid} />
    ) : null;

  return (
    <GridLayout title="Your categories">{categoriesListElement}</GridLayout>
  );
};
