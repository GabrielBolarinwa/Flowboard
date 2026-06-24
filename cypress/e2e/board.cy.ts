describe("board management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should create board", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.url().should("match", /\/board\/[a-zA-Z0-9_-]+/);

    cy.getDataTest("boardNameInput").should("not.exist");
  });
  it("adds board to list of boards", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.visit("/");
    cy.getDataTest("boards-list")
      .find("li")
      .find("h4[data-test=board-name]")
      .should("contain.text", "New board");
  });
  it("should delete board", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.visit("/");
    cy.getDataTest("dropdown-button").click();
    cy.getDataTest("dropdown-items-list")
      .contains("div[role=menuitem]", "Delete Board")
      .click();
    cy.getDataTest("delete-alert").should("be.visible");
    cy.getDataTest("deleteBoardButton").click();
    cy.getDataTest("boards-list").should("not.exist");
  });
  it("should keep board in list on cancel", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.visit("/");
    cy.getDataTest("dropdown-button").click();
    cy.getDataTest("dropdown-items-list")
      .contains("div[role=menuitem]", "Delete Board")
      .click();
    cy.getDataTest("delete-alert").should("be.visible");
    cy.getDataTest("deleteCancelButton").click();
    cy.getDataTest("boards-list")
      .find("li")
      .find("h4[data-test=board-name]")
      .should("contain.text", "New board");
  });
  it("should not create board at name max length", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type(
      "Non clementia temptatio vulnero subseco abduco vulpes.",
    );
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("boardNameError")
      .should("be.visible")
      .should("contain.text", "Exceeded maximum character limit of 50");
    cy.getDataTest("dialogContent").should("be.visible");
  });
  it("should not create board if limit is reached", () => {
    cy.fixture("kanbanLimits.json").then((data) => {
      localStorage.setItem("BoardStore", JSON.stringify(data.BoardStore));
    });
    cy.visit("/");
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");

    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.get("[data-sonner-toast]")
      .should("be.visible")
      .should("contain.text", "Board limit reached — maximum 10 boards");
    cy.getDataTest("boards-list")
      .find("li")
      .contains("h4[data-test=board-name]", "New Board")
      .should("not.exist");
  });
  it("should show empty state if the board is empty", () => {
    cy.getDataTest("noBoardsPrompt").should("be.visible");
  });
});
