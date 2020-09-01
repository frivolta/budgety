import React, { FC } from "react";
import ReactDOM from "react-dom";
// Router
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// Styles
import "./styles/reset.css";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { theme } from "./styles/Theme";
//SW
import * as serviceWorker from "./serviceWorker";
// Toastify__toast-container
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Sections
import {
  NotFound,
  SignUp,
  LogIn,
  Dashboard,
  Settings,
  EditSettings,
  Categories,
} from "./sections";
import { LoadingScreen } from "./lib/components";
import useAuthContext, { AuthProvider } from "./lib/auth/useAuthContext";
import { PrivateRoute } from "./lib/components/PrivateRoute/index";

// Toaster configuration
toast.configure({
  className: "Toastify__toast-container",
  draggable: true,
  draggablePercent: 60,
  autoClose: 2000,
});

// Global Style Definition
const GlobalStyles = createGlobalStyle`
 * {
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  const [currentUser, isLoading] = useAuthContext();

  if (isLoading && !currentUser) {
    return <LoadingScreen loadingText="Loading user..." />;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/settings/edit" component={EditSettings} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
