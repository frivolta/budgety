import React from "react";
import { useHistory } from "react-router";
import { useUserProfile } from "../../hooks/useUserProfile";
interface Props {
  children: React.ReactChild;
}
export const PageWrapper = ({ children }: Props) => {
  const { userProfile, loading: userProfileIsLoading } = useUserProfile();
  const history = useHistory();

  if (
    !userProfileIsLoading &&
    !userProfile?.isActive &&
    history.location.pathname !== "/settings"
  ) {
    history.push("/settings");
  }
  return <>{children}</>;
};
