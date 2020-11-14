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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Sections & components
import {
  SignUp,
  LogIn,
  Settings,
  Categories,
  Budget,
  AddExpense,
  Expenses,
} from "./sections";
import { PrivateRoute } from "./lib/components";
import { AuthProvider } from "./lib/auth/useAuthContext";
import {
  UseSingleExpenseModalProvider,
  SingleExpenseProvider,
} from "./lib/context";

// Toaster configuration
toast.configure({
  className: "Toastify__toast-container",
  draggable: true,
  draggablePercent: 60,
  autoClose: 2000,
});

export const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <PrivateRoute exact path="/" component={Expenses} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <PrivateRoute exact path="/budget" component={Budget} />
        <PrivateRoute exact path="/add-expense" component={AddExpense} />
        <PrivateRoute exact path="/expenses" component={Expenses} />
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
        <UseSingleExpenseModalProvider>
          <SingleExpenseProvider>
            <App />
          </SingleExpenseProvider>
        </UseSingleExpenseModalProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
