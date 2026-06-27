describe("kanban board data persistence post reload", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should persist kanban board data", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.visit("/");
    cy.reload();
    cy.getDataTest("boards-list")
      .find("li")
      .find("h4[data-test=board-name]")
      .should("contain.text", "New board");
    cy.getDataTest("boards-list")
      .find("li")
      .should("contain.text", "New board")
      .find("a")
      .click();
    cy.getDataTest("boardMain").should("be.visible");
    cy.getDataTest("board-heading")
      .find("h1")
      .should("contain.text", "New board");

    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column 2");
    cy.getDataTest("submitColumnForm").click();

    cy.getDataTest("columnList").find("li").as("listItems");
    cy.get("@listItems").eq(0).should("contain", "New Column");
    cy.get("@listItems").eq(1).should("contain", "New Column 2");
    cy.getDataTest("column-0")
      .find("[data-test='column-drag-handle'")
      .first()
      .realMouseDown({ position: "center" })
      .realMouseMove(500, 0, { position: "center" })
      .realMouseUp();
    cy.get("@listItems").eq(0).should("contain", "New Column 2");
    cy.get("@listItems").eq(1).should("contain", "New Column");
    cy.reload();

    cy.get("@listItems").eq(0).should("contain", "New Column 2");
    cy.get("@listItems").eq(1).should("contain", "New Column");
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
    cy.reload();
    cy.getDataTest("cardTitle").should("contain.text", "New Card 1");
    cy.getDataTest("cardDesc").should(
      "contain.text",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae veritatis sunt laborum non saepe neque aliquid excepturi a cum quam?",
    );

    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "New Column")
      .find('button[data-test="addCardButton"]')
      .click();
    cy.getDataTest("cardNameInput").type("Second Card");
    cy.getDataTest("cardSubmitButton").click();
    cy.getDataTest("cardList").find("li").as("listItems");
    cy.get("@listItems").eq(0).should("contain", "New Card 1");
    cy.get("@listItems").eq(1).should("contain", "Second Card");
    cy.getDataTest("card-0")
      .find("[data-test='card-drag-handle']")
      .first()
      .realMouseDown({ position: "center" })
      .realMouseMove(0, 300, { position: "center" })
      .realMouseUp();
    cy.get("@listItems").eq(0).should("contain", "Second Card");
    cy.get("@listItems").eq(1).should("contain", "New Card 1");
    cy.reload();

    cy.get("@listItems").eq(0).should("contain", "Second Card");
    cy.get("@listItems").eq(1).should("contain", "New Card 1");
  });
});
