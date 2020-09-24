import React from "react";
import { useHistory } from "react-router";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout } from "../../lib/components/GridPageLayout";

export const Dashboard = () => {
  const [currentUser, isLoading] = useAuthContext();
  const history = useHistory();
  const handleLogOut = () => {
    history.push("/login");
  };

  const dashboardElement =
    currentUser && !isLoading ? (
      <GridPageLayout user={currentUser} sectionName="Dashboard">
        <button onClick={handleLogOut}>Log out</button>
      </GridPageLayout>
    ) : null;

  return <>{dashboardElement}</>;
};
