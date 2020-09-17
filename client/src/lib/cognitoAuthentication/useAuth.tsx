import { useState, useEffect } from "react";
import { UserAuth } from "../../types";
import { getCurrentUser } from ".";

export type UseAuth = [boolean, UserAuth];

export const defaultUser: UserAuth = {
  email: "",
  authenticated: false,
};

export const useAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserAuth>(defaultUser);

  useEffect(() => {
    checkAuthenticatedUser();
  }, []);

  const checkAuthenticatedUser = async () => {
    setIsLoading(true);
    const loggedUser = await getCurrentUser();
    if (loggedUser && loggedUser.attributes && loggedUser.attributes.email) {
      setCurrentUser({
        authenticated: true,
        email: loggedUser.attributes.email,
      });
    }
    setIsLoading(false);
  };

  return [isLoading, currentUser];
};
