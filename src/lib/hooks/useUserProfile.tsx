import React from "react";
import { UserProfile } from "../../types";
import { getUserProfile } from "../api/queries";
import useAuthContext from "../auth/useAuthContext";

export const useUserProfile = () => {
  const [currentUser, currentUserIsLoading] = useAuthContext();
  const [loading, setIsLoading] = React.useState<boolean>(true);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(
    null
  );

  React.useEffect(() => {
    if (!currentUserIsLoading && currentUser?.uid) {
      getData(currentUser.uid);
    }
  }, [currentUser, currentUserIsLoading]);

  const getData = async (uuid: string) => {
    const profile = await getUserProfile(uuid);
    if (profile) {
      setUserProfile(profile);
    }
    setIsLoading(false);
  };

  return { userProfile, loading };
};
