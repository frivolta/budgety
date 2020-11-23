import { useState, useEffect } from "react";
import { User } from "firebase";
import { auth } from "../api/firebase";

export type UseAuth = [User | null, boolean];

export const useAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth: User | null): void => {
        setCurrentUser(userAuth);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [currentUser]);

  // Returning a tuple
  return [currentUser, isLoading];
};
