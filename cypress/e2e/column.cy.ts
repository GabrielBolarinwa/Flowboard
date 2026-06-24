describe("column management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should add column", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("columnList")
      .should("exist")
      .find("li")
      .should("contain.text", "New Column");
  });
  it("should rename column", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "New Column")
      .find("button[data-test=editColumnButton]")
      .click();
    cy.getDataTest("renameColumnInput").type("New Column 1");
    cy.getDataTest("saveEditButton").click();
    cy.getDataTest("columnList")
      .should("exist")
      .find("li")
      .should("contain.text", "New Column 1");
  });

  it("should delete column", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "New Column")
      .find("button[data-test=deleteColumnButton]")
      .click();
    cy.getDataTest("deleteColumnAlert").should("be.visible");
    cy.getDataTest("confirmDeleteButton").click();
    cy.getDataTest("columnList").should("not.exist");
  });
  it("should not delete column on cancel", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "New Column")
      .find("button[data-test=deleteColumnButton]")
      .click();
    cy.getDataTest("deleteColumnAlert").should("be.visible");
    cy.getDataTest("cancelDeleteButton").click();
    cy.getDataTest("columnList").should("exist").contains("li", "New Column");
  });
  it("should not create column if limit is reach", () => {
    cy.fixture("kanbanLimits.json").then((data) => {
      localStorage.setItem("BoardStore", JSON.stringify(data.BoardStore));
      localStorage.setItem("ColumnStore", JSON.stringify(data.ColumnStore));
      localStorage.setItem("CardStore", JSON.stringify(data.CardStore));
    });
    cy.visit("/");
    cy.visit("/board/board-1");
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.get("[data-sonner-toast]")
      .should("be.visible")
      .should(
        "contain.text",
        "Column limit reached — maximum 6 columns per board",
      );
    cy.getDataTest("columnList")
      .contains("li[data-test=column]", "New Column")
      .should("not.exist");
  });
  it("should show empty column prompt", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("noCardsPrompt").should("be.visible");
  });
  it("should update card count badge on card", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();

    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "New Column")
      .find('button[data-test="addCardButton"]')
      .click();
    cy.getDataTest("cardNameInput").type("New Card");
    cy.getDataTest("cardSubmitButton").click();
    cy.getDataTest("cardCount").contains("span", "1");
    cy.getDataTest("card").click();
    cy.getDataTest("deleteCardButton").click();
    cy.getDataTest("confirmDeleteButton").click();
    cy.getDataTest("cardCount").contains("span", "0");
  });
});
