import React, { FC } from "react";
import { UseAuth, useAuth } from "./useAuth";
import { createCtx } from "../utils/contextType";

interface Props {
  children: React.ReactChild;
}

// Create a context, using undefined! non null assertion
const [useAuthContext, AuthContextProvider] = createCtx<UseAuth>();

// Create a provider around context children
export const AuthProvider: FC<Props> = ({ children }) => {
  const [currentUser, isLoading] = useAuth();

  return (
    <AuthContextProvider value={[currentUser, isLoading]}>
      {children}
    </AuthContextProvider>
  );
};

export default useAuthContext;
