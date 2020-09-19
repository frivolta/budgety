// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//Login by cognito API
Cypress.Commands.add("loginByCognitoApi", (username, password) =>
  cy
    .task("loginByCognitoApi", {
      username,
      password,
    })
    .as("cognitoResponse")
    .get("@cognitoResponse")
    .then((cognitoResponse) => {
      const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`;
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.idToken`,
        cognitoResponse.signInUserSession.idToken.jwtToken
      );
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.accessToken`,
        cognitoResponse.signInUserSession.accessToken.jwtToken
      );
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.refreshToken`,
        cognitoResponse.signInUserSession.refreshToken.token
      );
      window.localStorage.setItem(
        `${keyPrefixWithUsername}.clockDrift`,
        cognitoResponse.signInUserSession.clockDrift
      );
      window.localStorage.setItem(
        `${cognitoResponse.keyPrefix}.LastAuthUser`,
        cognitoResponse.username
      );
      window.localStorage.setItem(
        "amplify-authenticator-authState",
        "signedIn"
      );

      cy.visit("/");
    })
);
// Fill fields and click signup button
export const signupUser = (user) => {
  cy.get('input[name="email"]').click().type(user.email);
  cy.get('input[name="password"]').click().type(user.password);
  cy.get('input[name="confirmPassword"]').click().type(user.password);
  cy.get("button").contains("Sign up").click();
};
Cypress.Commands.add("signupUser", signupUser);

// Fill fields and click signup button
export const signinUser = (user) => {
  cy.get('input[name="email"]').click().type(user.email);
  cy.get('input[name="password"]').click().type(user.password);
  cy.get("button").contains("Sign in").click();
};
Cypress.Commands.add("signinUser", signinUser);
Cypress.Commands.add("getTest", (s) => cy.get(`[data-test=${s}]`));
