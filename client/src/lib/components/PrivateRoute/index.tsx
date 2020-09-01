import React from "react";
import { Route } from "react-router-dom";
import { Redirect, RouteProps } from "react-router-dom";
import useAuthContext from "../../auth/useAuthContext";

interface Props extends RouteProps {
  component: any;
}

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [currentUser] = useAuthContext();
  const isAuthorized = currentUser?.uid ? true : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
