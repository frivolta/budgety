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
    it("contains user profile informations", () => {
      cy.contains("test@user.com");
      cy.contains("Account informations");
      cy.contains(fakeUserProfile.accountName);
      cy.contains("0,00 €");
      cy.contains("0,00 €");
    });

    it("correctly triggers edit modal if edit settings button is cliecked", () => {
      cy.contains("Edit settings").click();
      cy.contains("Edit Settings");
    });

    it("goes back to settings page if cancel button is clicked", () => {
      cy.contains("Cancel and go back").click();
      cy.contains("Account informations");
    });

    it("updates user informations when form is filled correctly", () => {
      cy.contains("Edit settings").click();
      cy.contains("Save settings").should("be.disabled");

      cy.get('input[name="accountName"]')
        .click()
        .clear()
        .type("New account name");
      cy.get('input[name="startingBalance"]').click().clear().type("10000");
      cy.get('input[name="monthlyBudget"]').click().clear().type("2000");

      cy.contains("Save settings").click();
      cy.contains("Your profile has been updated!");
    });

    it("re-triggering the edit settings will update the form default values with the new ones", () => {
      cy.contains("Edit settings").click();
      cy.get('input[name="accountName"]').should(
        "have.value",
        "New account name"
      );
      cy.get('input[name="startingBalance"]').should(
        "have.value",
        "€ 10,000.00"
      );
      cy.get('input[name="monthlyBudget"]').should("have.value", "€ 2,000.00");
    });

    it("updating with empty values should save default values to db", () => {
      cy.get('input[name="accountName"]').click().clear();

      cy.get('input[name="startingBalance"]').click().clear();
      cy.get('input[name="monthlyBudget"]').click().clear();

      cy.contains("Save settings").click();

      cy.contains("Edit settings").click();
      cy.get('input[name="accountName"]').should(
        "have.value",
        "No account name"
      );
      cy.get('input[name="startingBalance"]').should("have.value", "€ 0.00");
      cy.get('input[name="monthlyBudget"]').should("have.value", "€ 0.00");
    });

    it("logs out the user when button logout is clicked", () => {
      cy.contains("Cancel and go back").click();

      cy.get("button").contains("Log out").click();
      cy.location("pathname").should("eq", "/login");
    });

    after(() => {
      cy.logout();
      cy.callFirestore("delete", `users/${Cypress.env("TEST_UID")}/profile`, {
        recursive: true,
      });
    });
  });
});
