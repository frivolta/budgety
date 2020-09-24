/// <reference types="cypress" />
import { NETWORK } from "../../support/variables";

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
});
