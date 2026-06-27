describe("home page search tests", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should run searches of different cases", () => {
    cy.fixture("kanbanLimits.json").then((data) => {
      localStorage.setItem("BoardStore", JSON.stringify(data.BoardStore));
      localStorage.setItem("ColumnStore", JSON.stringify(data.ColumnStore));
      localStorage.setItem("CardStore", JSON.stringify(data.CardStore));
    });
    cy.visit("/");
    cy.getDataTest("boardsSearch").type("Limit Testing Board (6 Columns)");
    cy.getDataTest("board-item").should("have.length", 1);
    cy.getDataTest("board-item").should(
      "contain",
      "Limit Testing Board (6 Columns)",
    );
    cy.getDataTest("board-item").should("not.contain", "Standard Board 2");
    cy.getDataTest("boardsSearch").clear();
    cy.getDataTest("board-item").should("have.length", 10);

    cy.getDataTest("boardsSearch").type(
      "This board has 6 columns to test UI limit caps.",
    );
    cy.getDataTest("board-item").should("have.length", 1);
    cy.getDataTest("board-item").should(
      "contain",
      "Limit Testing Board (6 Columns)",
    );
    cy.getDataTest("boardsSearch").type("Not Real");
    cy.getDataTest("board-item").should("have.length", 0);
    cy.getDataTest("noResults").should("be.visible");
  });
});
