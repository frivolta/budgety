import React from "react";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout, InfoCard } from "../../lib/components";
import { CategoriesList } from "./components";

export const Categories = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();

  const categoriesListElement =
    !isLoadingCurrentUser && currentUser?.uid ? (
      <CategoriesList currentUserId={currentUser.uid} />
    ) : null;

  const categoriesElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Categories">
        {categoriesListElement}
      </GridPageLayout>
    ) : null;

  return <>{categoriesElement}</>;
};
