import React from "react";
import { Route } from "react-router-dom";
import { Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../../cognitoAuthentication/useAuth";
import { LoadingScreen } from "../LoadingScreen";

interface Props extends RouteProps {
  component: any;
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [isLoading, currentUser] = useAuth();

  if (isLoading) {
    return <LoadingScreen loadingText="Loading user details..." />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser.authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
