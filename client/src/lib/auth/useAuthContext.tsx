import React, { createContext, useContext } from "react";
import { UseAuth, useAuth } from "./useAuth";

interface Props {
  children: React.ReactChild;
}

// Create a context, using undefined! non null assertion
const AuthContext = createContext<UseAuth>(undefined!);

// Create a provider around context children
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useAuth();

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to get values
export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
