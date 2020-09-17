import React, { FC } from "react";
import ReactDOM from "react-dom";
//AWS
import awsconfig from "./aws-exports";
import Amplify from "aws-amplify";
// Router
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// Auth
import { useAuth } from "./lib/cognitoAuthentication/useAuth";
// Styles
import { ThemeProvider } from "styled-components";
import { GlobalStyle, defaultTheme } from "./styles";
//SW
import * as serviceWorker from "./serviceWorker";
// Toastify__toast-container
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Sections & components
import { Dashboard, SignUp, LogIn } from "./sections";
import { PrivateRoute } from "./lib/components";

// Amplify config
Amplify.configure(awsconfig);

// Toaster configuration
toast.configure({
  className: "Toastify__toast-container",
  draggable: true,
  draggablePercent: 60,
  autoClose: 2000,
});

export const App: FC = () => {
  const [isLoading] = useAuth();
  if (isLoading) {
    return <p>Is loading...</p>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ToastContainer />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
