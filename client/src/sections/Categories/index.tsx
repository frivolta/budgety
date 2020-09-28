import React from "react";
import { IoIosHelpCircleOutline } from "react-icons/io";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout, InfoCard } from "../../lib/components";
import { CategoriesList } from "./components";

export const Categories = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const categoriesPageDescriptionElement = (
    <InfoCard iconComponent={<IoIosHelpCircleOutline size="32" />}>
      Tap on the category button to switch between category type: Wants, Needs.
    </InfoCard>
  );

  const categoriesListElement =
    !isLoadingCurrentUser && currentUser?.uid ? (
      <CategoriesList currentUserId={currentUser.uid} />
    ) : null;

  const categoriesElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Categories">
        {categoriesPageDescriptionElement}
        {categoriesListElement}
      </GridPageLayout>
    ) : null;

  return <>{categoriesElement}</>;
};
