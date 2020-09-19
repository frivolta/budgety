/// <reference types="cypress" />
import { NETWORK } from "../../support/variables";
import "cypress-localstorage-commands";

/**
 *  1) User get validation visual errors
 *  - Type username
 *  - Type password
 *  - Button must be enabled
 *  - Click Signin
 *  - Throws an error if required fileds are empty
 *  - Shows enabled button if all fields are correctly filled
 *  - Throws error if invalid credentials
 *  - Gets redirected if correctly sign in
 *  - Can navigate to signup
 */

describe("Signin requests", function () {
  this.beforeEach(() => {
    cy.visit(`${NETWORK.LOCAL}/login`, {
      onBeforeLoad: (win) => {
        win.fetch = null;
      },
    }).contains("Sign in");
  });

  it("rejects user login if user email does not exists", () => {
    // Stub rejection server
    cy.server();
    cy.route({
      url: "https://cognito-idp.eu-west-2.amazonaws.com/",
      method: "POST",
      status: 400,
      response: {
        __type: "UserNotFoundException",
        message: "User does not exist.",
      },
      delay: 200,
    }).as("signin-reject");

    cy.signinUser({ email: "testuser@email.com", password: "TestPassword01!" });

    // Wait for server response
    cy.wait("@signin-reject").then((xhr) => {
      expect(xhr.status).to.equal(400);
      cy.get(".Toastify__toast")
        .contains("Oops, something went wrong...")
        .should("be.visible");
    });
  });
  it("signs in user with correct credentials", () => {
    cy.signinUser({
      email: Cypress.env("TEST_USER"),
      password: Cypress.env("TEST_PASSWORD"),
    });
  });
});
