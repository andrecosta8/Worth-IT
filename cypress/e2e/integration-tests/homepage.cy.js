describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("verify page contain title", () => {
    cy.get("[data-testid=title]").should("have.text", "Welcome to Worth IT?!");
  });
});
