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
// Sections
import { NotFound, SignUp, LogIn } from "./sections";

// Global Style Definition
const GlobalStyles = createGlobalStyle`
 * {
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
