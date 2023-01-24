describe("login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("verify login flow", () => {
    cy.get("[data-testid=login-button]").click();
    cy.url().should("include", "/login");
    cy.get("[data-testeid=loginForm]").should("be.visible");
    cy.get("[data-testid=email-input]").type("andre.costa@xing.com");
    cy.get("[data-testid=email-input]").should("have.value", "andre.costa@xing.com")
    cy.get("[data-testid=password-input]")
      .type("Hello321")
      .should("match", "Hello321");
    cy.get("[data-testid=confirm-login]").click();
    cy.url().should("eq", "http://localhost:3000/profile");
  });
});
