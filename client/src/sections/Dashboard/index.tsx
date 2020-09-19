import { Auth } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../lib/cognitoAuthentication/useAuth";
export const Dashboard = () => {
  const [isLoading, currentUser] = useAuth();
  const history = useHistory();
  const handleLogOut = () => {
    Auth.signOut();
    history.push("/login");
  };
  return (
    <p>
      {!isLoading && currentUser.authenticated
        ? "User is auth"
        : "User is not auth"}
      <button onClick={handleLogOut}>Log out</button>
    </p>
  );
};