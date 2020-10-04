import React from "react";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { BudgetView } from "./components";
import budgetIntroImage from "./assets/images/budget-intro-image.svg";
import { IntroDescription } from "../../lib/components";

const description = `The default budget follows the 50 / 30 / 20 rule, but you can customize it as you wish!`;

export const Budget = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();

  const introDescriptionElement = (
    <IntroDescription description={description} image={budgetIntroImage} />
  );

  const budgetElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Budget">
        {introDescriptionElement}
        <BudgetView userUid={currentUser.uid} />
      </GridPageLayout>
    ) : null;

  return <>{budgetElement}</>;
};
