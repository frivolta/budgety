/// <reference types="cypress" />

describe("Signup", function () {
  this.beforeEach(() => {
    cy.visit(`http://localhost:3000/signup`);
  });

  it("doesn't show user menu for not auth users", () => {
    cy.contains("Not auth menu").should("be.visible");
  });

  it("doesn't show navigation for not auth users", () => {
    cy.contains("Dashboard").should("not.be.visible");
  });
});
