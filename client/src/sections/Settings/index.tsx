import React from "react";
import useAuthContext from "../../lib/auth/useAuthContext";
import { InfoCard } from "../../lib/components";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { useUserProfile } from "../../lib/hooks/useUserProfile";
import { IoIosHelpCircleOutline } from "react-icons/io";

export const Settings = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();

  const settingsAlertCard =
    !userProfileIsLoading && !userProfile?.isActive ? (
      <InfoCard iconComponent={<IoIosHelpCircleOutline size="32" />}>
        Update the settings below to start using Budgety.
      </InfoCard>
    ) : null;

  const settingsElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Settings">
        {settingsAlertCard}
      </GridPageLayout>
    ) : null;

  return <>{settingsElement}</>;
};
