describe("routing tests", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should load routes correctly", () => {
    cy.getDataTest("homeMain").should("be.visible");
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.visit("/");
    cy.getDataTest("boards-list")
      .find("li")
      .should("contain.text", "New board")
      .find("a")
      .click();
    cy.getDataTest("boardMain").should("be.visible");
    cy.getDataTest("board-heading")
      .find("h1")
      .should("contain.text", "New board");
  });
  it("should display the not found page", () => {
    cy.visit("/not-real");
    cy.getDataTest("notFoundMain").should("be.visible");
  });
  it("should display board on direct navigation", () => {
    cy.fixture("kanbanLimits.json").then((data) => {
      localStorage.setItem("BoardStore", JSON.stringify(data.BoardStore));
      localStorage.setItem("ColumnStore", JSON.stringify(data.ColumnStore));
      localStorage.setItem("CardStore", JSON.stringify(data.CardStore));
    });
    cy.visit("/");
    cy.visit("/board/board-1");
    cy.getDataTest("boardMain").should("be.visible");
    cy.getDataTest("board-heading")
      .find("h1")
      .should("contain.text", "Limit Testing Board (6 Columns)");
  });
});
