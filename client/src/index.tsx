import React, { FC } from "react";
import ReactDOM from "react-dom";
// Router
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
// Styles
import { ThemeProvider } from "styled-components";
import { GlobalStyle, defaultTheme } from "./styles";
//SW
import * as serviceWorker from "./serviceWorker";
// Toastify__toast-container
import "react-toastify/dist/ReactToastify.css";
// Sections
import { SignUp } from "./sections";
// Toaster configuration
// Global Style Definition

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
