describe("Dashboard Page", () => {
  describe("when authenticated", () => {
    before(() => {
      // Login using custom token
      cy.login();
      cy.visit("/dashboard");
    });

    it("Does not redirect", () => {
      cy.url().should("equal", "/dashboard");
    });
  });
});
