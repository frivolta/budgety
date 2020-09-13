import React, { createContext, useContext } from "react";
import { UseAuth, useAuth } from "./useAuth";
import { createCtx } from "../utils/contextType";

interface Props {
  children: React.ReactChild;
}

// Create a context, using undefined! non null assertion
//const AuthContext = createContext<UseAuth>(undefined!);
const [useAuthContext, AuthContextProvider] = createCtx<UseAuth>();

// Create a provider around context children
export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useAuth();

  return (
    <AuthContextProvider value={[currentUser, setCurrentUser]}>
      {children}
    </AuthContextProvider>
  );
};

export default useAuthContext;
