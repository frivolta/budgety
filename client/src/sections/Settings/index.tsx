import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { auth } from "../../lib/api/firebase";
import { useAuth } from "../../lib/auth/useAuth";
import { GridLayout, LoadingScreen } from "../../lib/components";
import { UserGeneralInfo } from "./components/UserGeneralInfo";
import { toasterInfo, toasterError } from "../../lib/utils/toaster";
import { LOGOUT_SUCCESS, LOGOUT_ERRORS } from "../../lib/messages/index";
import { UserSettingsCard } from "./components/UserSettingsCards";
// @Test
// - User can see account name or empty
// - User can see starting balance or empty
// - User can see monthly budget or empty
// - User can logout
// - User can go to edit settings page clicking on any of action icons
// - User cannot click on "Go to settings icon"

export const Settings: React.FC = () => {
  const history = useHistory();
  const [currentUser, isLoading] = useAuth();

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      toasterInfo(LOGOUT_SUCCESS.success);
      history.push("/login");
    } catch {
      toasterError(LOGOUT_ERRORS.genericError);
    }
  };

  const renderElementsIfAuthorized = () => {
    if (!isLoading && currentUser && currentUser.email) {
      return (
        <>
          <UserGeneralInfo
            userEmail={currentUser.email}
            isLoading={isLoading}
            handleLogOut={handleLogOut}
          />
          <UserSettingsCard userUid={currentUser.uid} />
        </>
      );
    }
    if (!isLoading && !currentUser) {
      return <Redirect to="/signup" />;
    }
    return <LoadingScreen loadingText="Loading settings..." />;
  };

  return (
    <GridLayout title="Settings">{renderElementsIfAuthorized()}</GridLayout>
  );
};
