import React from "react";
import { Route } from "react-router-dom";
import { Redirect, RouteProps } from "react-router-dom";
import useAuthContext from "../../auth/useAuthContext";
import { LoadingScreen } from "../LoadingScreen";

interface Props extends RouteProps {
  component: any;
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [currentUser, isLoading] = useAuthContext();

  const isAuthorized = currentUser?.uid ? true : false;

  if (isLoading) {
    return <LoadingScreen loadingText="Loading user details..." />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
