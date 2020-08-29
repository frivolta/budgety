import { useState, useEffect } from "react";
import { User } from "firebase";
import { auth } from "../api/firebase";

export type UseAuth = [
  User | null,
  React.Dispatch<React.SetStateAction<User | null>>
];

export const useAuth = (): UseAuth => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth: User | null): void => {
        setCurrentUser(userAuth);
      }
    );
    return unsubscribe;
  }, [currentUser]);

  // Returning a tuple
  return [currentUser, setCurrentUser];
};
