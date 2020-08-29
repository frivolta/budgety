import React from "react";
import { Route } from "react-router-dom";
import { Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  component: any;
  isAuthorized: boolean;
}

export const PrivateRoute = ({
  component: Component,
  isAuthorized,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};
