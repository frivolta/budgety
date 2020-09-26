describe("Settings Page", () => {
  describe("when newly created user", () => {
    before(() => {
      cy.login(Cypress.env("TEST_UID"));
      cy.callFirestore("delete", `users/${Cypress.env("TEST_UID")}/profile`, {
        recursive: true,
      });
      cy.visit("/settings");
    });

    it("contains an alert message", () => {
      cy.contains("Update the settings below to start using Budgety.");
    });

    after(() => {
      cy.logout();
    });
  });
});
