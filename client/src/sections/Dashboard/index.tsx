import React from "react";
import { useHistory } from "react-router";
import { auth } from "../../lib/api/firebase";
import { getUserProfile } from "../../lib/api/queries";
import useAuthContext from "../../lib/auth/useAuthContext";
import { Card } from "../../lib/components";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { useUserProfile } from "../../lib/hooks/useUserProfile";

export const Dashboard = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();
  const history = useHistory();

  const handleLogOut = async () => {
    auth.signOut();
    history.push("/login");
  };

  const redirectToDashboardPage = () => {
    history.push("/dashboard");
  };

  if (!currentUser?.uid && !isLoadingCurrentUser) {
    redirectToDashboardPage();
  }

  const userProfileElement =
    !userProfileIsLoading && !userProfile?.isActive ? (
      <p> You need to update your settings to start using Budgety.</p>
    ) : (
      <p>you have a correct profile</p>
    );

  const dashboardElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Dashboard">
        {userProfileElement}
        <button onClick={handleLogOut}>Log out</button>
      </GridPageLayout>
    ) : null;

  return <>{dashboardElement}</>;
};
