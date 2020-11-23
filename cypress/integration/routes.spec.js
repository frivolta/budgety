describe("Routes", () => {
  describe("when NOT authenticated", () => {
    before(() => {
      cy.logout();
      cy.visit("/dashboard");
    });

    it("redirects user to login page", () => {
      console.log(cy.url());
      cy.url().should("include", "/login");
    });
  });

  describe("when authenticated", () => {
    before(() => {
      // Login using custom token
      cy.login(Cypress.env("TEST_UID"));
      cy.visit("/dashboard");
    });

    it("Does not redirect", () => {
      cy.url().should("include", "/dashboard");
    });

    after(() => {
      cy.logout();
    });
  });

  describe("when newly created user", () => {
    before(() => {
      // Login using custom token
      cy.login(Cypress.env("TEST_UID"));
      // Purge user profile
      cy.callFirestore("delete", `users/${Cypress.env("TEST_UID")}/profile`, {
        recursive: true,
      });
      cy.visit("/dashboard");
    });

    it("redirects user to settings page with warning", () => {
      cy.location("pathname").should("eq", "/settings");
      cy.contains("Update the settings below to start using Budgety.");
    });

    after(() => {
      cy.logout();
    });
  });
});
