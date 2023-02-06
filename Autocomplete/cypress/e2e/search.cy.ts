// https://docs.cypress.io/api/introduction/api.html

describe("Test Autocomplete", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("label", "Type the name of a city to search");
    cy.contains("label", "Type the name of a book to search");
    cy.get("input")
      .invoke("attr", "placeholder")
      .should("contain", "Type here at least 3 characters...");
    cy.fixture("book").then(({ search }) => {
      cy.get('input[data-testId="search-book"]').type(search);
    });
    cy.fixture("city").then(({ search }) => {
      cy.get('input[data-testId="search-city"]').type(search);
    });
  });
});
