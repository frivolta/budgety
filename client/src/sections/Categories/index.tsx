import React from "react";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout } from "../../lib/components";
import { IntroDescription } from "../../lib/components";
import { CategoriesList } from "./components";
import categoriesIntroImage from "./assets/images/categories-intro-image.svg";

export const Categories = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();

  const categoriesListElement =
    !isLoadingCurrentUser && currentUser?.uid ? (
      <CategoriesList currentUserId={currentUser.uid} />
    ) : null;

  const description = `Change the budget type for a category
  tapping on it. Your changes will be reflected
  on your budget calculations.`;

  const introDescriptionElement = (
    <IntroDescription description={description} image={categoriesIntroImage} />
  );

  const categoriesElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Categories">
        {introDescriptionElement}
        {categoriesListElement}
      </GridPageLayout>
    ) : null;

  return <>{categoriesElement}</>;
};
