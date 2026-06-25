describe("card management", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should add card", () => {
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
    cy.getDataTest("cardList").contains("[data-test='card-0']", "New Card");
  });
  it("should open card detail dialog", () => {
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
    cy.getDataTest("cardList").contains("[data-test='card-0']", "New Card");
    cy.getDataTest("card-0").click();
    cy.getDataTest("cardDetailDialog").should("be.visible");
    cy.getDataTest("cardNameInput").should("have.value", "New Card");
    cy.getDataTest("statusSelect").should("contain.text", "Todo");
    cy.getDataTest("prioritySelect").should("contain.text", "Medium");
  });
  it("should edit title without opening dialog", () => {
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
    cy.getDataTest("cardList").contains("[data-test='card-0']", "New Card");
    cy.getDataTest("cardTitle").should("contain.text", "New Card").click();

    cy.getDataTest("card-0").click();
    cy.getDataTest("cardDetailDialog").should("not.exist");
    cy.getDataTest("quickEditInput").type(" 1");
    cy.getDataTest("quickEditForm").submit();
    cy.getDataTest("cardTitle").should("contain.text", "New Card 1");
  });
  it("should persist edits after save", () => {
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
    cy.getDataTest("cardList")
      .contains("[data-test='card-0']", "New Card")
      .click();
    cy.getDataTest("cardDetailDialog").should("be.visible");
    cy.getDataTest("cardNameInput").type("New Card 1");
    cy.getDataTest("cardDescription").type(
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae veritatis sunt laborum non saepe neque aliquid excepturi a cum quam?",
    );
    cy.getDataTest("cardSubmitButton").click();
    cy.getDataTest("cardTitle").should("contain.text", "New Card 1");
    cy.getDataTest("cardDesc").should(
      "contain.text",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae veritatis sunt laborum non saepe neque aliquid excepturi a cum quam?",
    );
  });
  it("should delete card", () => {
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
    cy.getDataTest("cardList")
      .contains("[data-test='card-0']", "New Card")
      .click();

    cy.getDataTest("deleteCardButton").click();
    cy.getDataTest("confirmDeleteButton").click();
    cy.getDataTest("cardList")
      .contains("[data-test='card-0']", "New Card")
      .should("not.exist");
  });
  it("should not delete card on cancel", () => {
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
    cy.getDataTest("cardList")
      .contains("[data-test='card-0']", "New Card")
      .click();

    cy.getDataTest("deleteCardButton").click();
    cy.getDataTest("cancelDeleteButton").click();
    cy.getDataTest("cardList")
      .contains("[data-test='card-0']", "New Card")
      .should("exist");
  });
  it("should not add card on card limit reached", () => {
    cy.fixture("kanbanLimits.json").then((data) => {
      localStorage.setItem("BoardStore", JSON.stringify(data.BoardStore));
      localStorage.setItem("ColumnStore", JSON.stringify(data.ColumnStore));
      localStorage.setItem("CardStore", JSON.stringify(data.CardStore));
    });
    cy.visit("/");
    cy.visit("/board/board-1");
    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "Heavy Load Column (50 Cards)")
      .find('button[data-test="addCardButton"]')
      .click();
    cy.getDataTest("cardNameInput").type("New Card");
    cy.getDataTest("cardSubmitButton").click();
    cy.get("[data-sonner-toast]")
      .should("be.visible")
      .should(
        "contain.text",
        "Card limit reached — maximum 50 cards per column",
      );
    cy.getDataTest("cardList")
      .contains("li[data-test=card-0]", "New Card")
      .should("not.exist");
  });
});
