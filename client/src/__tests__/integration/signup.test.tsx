import React from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../styles";
import { createMemoryHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react";
import { SignUp } from "../../sections";
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

const history = createMemoryHistory({ initialEntries: ["/signup"] });
const renderWithRouter = () =>
  render(
    <ThemeProvider theme={defaultTheme}>
      <Router history={history}>
        <ToastContainer />
        <Switch>
          <Route exact path="/signup">
            <AuthProvider>
              <SignUp />
            </AuthProvider>
          </Route>
          <Route exact path="/">
            <div data-testid="GenericComponent"></div>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );

describe("<SignUp/>", () => {
  it("correctly renders the signup form", () => {
    const { getByTestId } = renderWithRouter();
    const form = getByTestId("SignupForm");
    expect(form).toBeInTheDocument();
  });
  it("correctly renders the signup form", () => {
    const { getByTestId } = renderWithRouter();
    const form = getByTestId("SignupForm");
    expect(form).toBeInTheDocument();
  });

  it("let user signup with valid credentials", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter();
    const emailField = getByPlaceholderText("yourname@company.com");
    const passwordField = getByPlaceholderText("Password");
    const confirmPasswordField = getByPlaceholderText("Confirm Password");
    const submitButton = getByTestId("Button");

    fireEvent.change(emailField, {
      target: { value: "test@test.com" },
    });

    fireEvent.change(passwordField, { target: { value: "Lampone01!" } });
    fireEvent.change(confirmPasswordField, {
      target: { value: "Lampone01!" },
    });
    fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();

    await wait(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(history.location.pathname).toBe("/dashboard");
      expect(getByText("You succesfully signed up!")).toBeInTheDocument();
    });
  });

  it("notify the user if email is already present", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = renderWithRouter();
    history.push("/signup");
    const emailField = getByPlaceholderText("yourname@company.com");
    const passwordField = getByPlaceholderText("Password");
    const confirmPasswordField = getByPlaceholderText("Confirm Password");
    const submitButton = getByTestId("Button");

    auth.createUserWithEmailAndPassword.mockRejectedValue(() => ({
      error: {
        code: 400,
        message: "EMAIL_EXISTS",
        errors: [
          {
            message: "EMAIL_EXISTS",
            domain: "global",
            reason: "invalid",
          },
        ],
      },
    }));

    fireEvent.change(emailField, {
      target: { value: "test@test.com" },
    });

    fireEvent.change(passwordField, { target: { value: "Lampone01!" } });
    fireEvent.change(confirmPasswordField, {
      target: { value: "Lampone01!" },
    });
    fireEvent.click(submitButton);

    expect(submitButton).not.toBeDisabled();

    await wait(() => {
      expect(auth.createUserWithEmailAndPassword).toHaveBeenCalled();
      expect(history.location.pathname).toBe("/signup");
      expect(getByText("Oops, something went wrong...")).toBeInTheDocument();
    });
  });
});
