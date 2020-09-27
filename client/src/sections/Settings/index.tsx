import React, { useState } from "react";
import useAuthContext from "../../lib/auth/useAuthContext";
import { InfoCard } from "../../lib/components";
import { GridPageLayout } from "../../lib/components/GridPageLayout";
import { useUserProfile } from "../../lib/hooks/useUserProfile";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { EditSettings, ProfileInfo, UserInfo } from "./components";

export const Settings = () => {
  const [currentUser, isLoadingCurrentUser] = useAuthContext();
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();
  const [isEditSettings, setIsEditSettings] = useState<boolean>(true);

  const settingsAlertCard =
    !userProfileIsLoading && !userProfile?.isActive ? (
      <InfoCard iconComponent={<IoIosHelpCircleOutline size="32" />}>
        Update the settings below to start using Budgety.
      </InfoCard>
    ) : null;

  const editSettingsElement =
    isEditSettings && userProfile ? (
      <EditSettings
        userSettings={userProfile}
        handleSwitchToSettings={() => setIsEditSettings(false)}
      />
    ) : null;

  const settingsViewElement = !isEditSettings ? (
    <>
      {settingsAlertCard}
      <ProfileInfo />
      <UserInfo handleEditSettingsClick={() => setIsEditSettings(true)} />
    </>
  ) : (
    editSettingsElement
  );

  const settingsElement =
    currentUser && !isLoadingCurrentUser ? (
      <GridPageLayout user={currentUser} sectionName="Settings">
        {settingsViewElement}
      </GridPageLayout>
    ) : null;

  return <>{settingsElement}</>;
};
