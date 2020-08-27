import { useState, useEffect } from "react";
import { User } from "firebase";
import { auth } from "../api/firebase";

// Defining tuple to conform to react useHook pattern
export type UseAuth = [User | null, (value: User) => void];

export const useAuth = (): UseAuth => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("Logged user: ", currentUser);
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth: User | null): void => {
        setCurrentUser(userAuth);
      }
    );
    return unsubscribe;
  }, [currentUser]);

  return [currentUser, setCurrentUser];
};
