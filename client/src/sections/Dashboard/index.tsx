import React from "react";
import { useHistory } from "react-router";
import { auth } from "../../lib/api/firebase";
import useAuthContext from "../../lib/auth/useAuthContext";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { PageWrapper } from "../../lib/components/PageWrapper";

export const Dashboard = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const history = useHistory();

  const handleLogOut = async () => {
    auth.signOut();
    history.push("/login");
  };

  const dashboardElement =
    currentUser && !isLoadingCurrentUser ? (
      <PageWrapper>
        <GridPageLayout user={currentUser} sectionName="Dashboard">
          <button onClick={handleLogOut}>Log out</button>
        </GridPageLayout>
      </PageWrapper>
    ) : null;

  return <>{dashboardElement}</>;
};
