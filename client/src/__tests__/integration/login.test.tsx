import React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles";
import { createMemoryHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react";
import { LogIn } from "../../sections";
import { auth } from "../../lib/api/firebase";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../../lib/auth/useAuthContext";

jest.mock("../../lib/api/firebase", () => {
  return {
    auth: {
      createUserWithEmailAndPassword: jest.fn(() => {
        return {
          user: {
            uid: "fakeuid",
            email: "test@test.com",
          },
        };
      }),
      onAuthStateChanged: jest.fn(),
      signOut: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
    },
    firestore: {
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          collection: jest.fn(() => ({
            add: jest.fn(),
          })),
          set: jest.fn(),
        })),
      })),
    },
  };
});

const history = createMemoryHistory({ initialEntries: ["/login"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <ToastContainer />
        <Switch>
          <Route exact path="/login">
            <AuthProvider>
              <LogIn />
            </AuthProvider>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<LogIn/>", () => {
  it("correctly renders the login form", () => {
    const { getByTestId } = renderWithRouter();
    const form = getByTestId("LogInForm");
    expect(form).toBeInTheDocument();
  });

  it("let user to log in with correct credentials", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter();
    const emailField = getByPlaceholderText("yourname@company.com");
    const passwordField = getByPlaceholderText("Password");
    const submitButton = getByTestId("Button");
    fireEvent.change(emailField, {
      target: { value: "test@test.com" },
    });

    fireEvent.change(passwordField, { target: { value: "Lampone01!" } });

    fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();
    await wait(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalled();
      expect(history.location.pathname).toBe("/dashboard");
      expect(getByText("You succesfully signed in!")).toBeInTheDocument();
    });
  });
});
