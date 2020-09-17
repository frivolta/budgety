import React from "react";
import { Route } from "react-router-dom";
import { Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../../cognitoAuthentication/useAuth";

interface Props extends RouteProps {
  component: any;
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [isLoading, currentUser] = useAuth();

  //@ToDo: This must return the loading component
  if (isLoading) {
    return <p>is loading</p>;
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
