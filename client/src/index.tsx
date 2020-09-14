import React, { FC } from "react";
import ReactDOM from "react-dom";
// Router
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// Auth
import useAuthContext, { AuthProvider } from "./lib/auth/useAuthContext";
// Styles
import { ThemeProvider } from "styled-components";
import { GlobalStyle, defaultTheme } from "./styles";
//SW
import * as serviceWorker from "./serviceWorker";
// Toastify__toast-container
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Sections
import { SignUp } from "./sections";
import { LogIn } from "./sections/LogIn";

// Toaster configuration
toast.configure({
  className: "Toastify__toast-container",
  draggable: true,
  draggablePercent: 60,
  autoClose: 2000,
});

export const App: FC = () => {
  const [currentUser, isLoading] = useAuthContext();

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
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
