import { Auth } from "aws-amplify";
import React from "react";
import { useHistory } from "react-router";
import { userIsAuthorized } from "../../lib/cognitoAuthentication";
export const Dashboard = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const history = useHistory();
  React.useEffect(() => {
    checkIfUserIsAuth();
  }, []);
  const checkIfUserIsAuth = async () => {
    const isAuth = await userIsAuthorized();
    setIsAuth(isAuth);
  };

  const handleLogOut = () => {
    Auth.signOut();
    history.push("/login");
  };
  return (
    <p>
      {isAuth ? "User is auth" : "User is not auth"}
      <button onClick={handleLogOut}>Log out</button>
    </p>
  );
};
