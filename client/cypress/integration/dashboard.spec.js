describe("Dashboard Page", () => {
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

    /* after(() => {
      cy.logout();
    }); */
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

    it.only("includes button to initialize user settings", () => {
      cy.url().should("include", "/dashboard");
    });

    after(() => {
      cy.logout();
    });
  });
});
