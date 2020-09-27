const fakeUserProfile = {
  isActive: false,
  accountName: "No name",
  startingBalance: "0.00",
  monthlyBudget: "0.00",
};

describe("Settings Page", () => {
  describe("when newly created user", () => {
    before(() => {
      cy.login(Cypress.env("TEST_UID"));
      cy.callFirestore("delete", `users/${Cypress.env("TEST_UID")}/profile`, {
        recursive: true,
      });
      cy.callFirestore(
        "add",
        `users/${Cypress.env("TEST_UID")}/profile`,
        fakeUserProfile
      );
      cy.visit("/settings");
    });

    it("contains an alert message", () => {
      cy.getTest("InfoCard").should("be.not.be.visible");
      cy.contains("Update the settings below to start using Budgety.");
    });
    it("Contains user profile informations", () => {
      cy.contains("Account informations");
      cy.contains(fakeUserProfile.accountName);
      cy.contains("0,00 €");
      cy.contains("0,00 €");
    });

    after(() => {
      cy.logout();
      cy.callFirestore("delete", `users/${Cypress.env("TEST_UID")}/profile`, {
        recursive: true,
      });
    });
  });
});
