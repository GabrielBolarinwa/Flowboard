describe("drag  and drop tests", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("should drag card across columns and update respective card count badges", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("arialiveRegion").should("exist");
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
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column 2");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("card-0")
      .find("[data-test='card-drag-handle']")
      .first()
      .realMouseDown({ position: "center" })
      .realMouseMove(0, 10, { position: "center" });
    cy.getDataTest("column-1")
      .find("[data-test=cardList]")
      .realMouseMove(0, 0, { position: "center" })
      .realMouseUp();
    cy.getDataTest("arialiveRegion").should(
      "contain",
      "Card moved to New Column 2",
    );

    cy.getDataTest("column-0").find("[data-test=card-0]").should("not.exist");
    cy.getDataTest("column-1").find("[data-test=card-0]").should("exist");
    cy.getDataTest("column-0")
      .find("[data-test=cardCount]")
      .contains("span", "0");
    cy.getDataTest("column-1")
      .find("[data-test=cardCount]")
      .contains("span", "1");
  });
  it("should reorder cards on same column drop", () => {
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
    cy.getDataTest("columnList")
      .should("exist")
      .contains("li", "New Column")
      .find('button[data-test="addCardButton"]')
      .click();
    cy.getDataTest("cardNameInput").type("New Card 2");
    cy.getDataTest("cardSubmitButton").click();
    cy.getDataTest("cardList").find("li").as("listItems");
    cy.get("@listItems").eq(0).should("contain", "New Card");
    cy.get("@listItems").eq(1).should("contain", "New Card 2");
    cy.getDataTest("card-0")
      .find("[data-test='card-drag-handle']")
      .first()
      .realMouseDown({ position: "center" })
      .realMouseMove(0, 300, { position: "center" })
      .realMouseUp();
    cy.get("@listItems").eq(0).should("contain", "New Card 2");
    cy.get("@listItems").eq(1).should("contain", "New Card");
  });
  it("should reorder columns on drag", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type(" 2");
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
    cy.getDataTest("arialiveRegion").should(
      "contain",
      "Column moved to position 2",
    );

    cy.get("@listItems").eq(0).should("contain", "New Column 2");
    cy.get("@listItems").eq(1).should("contain", "New Column");
  });
  it("should drag cards with keyboard only", () => {
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
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column 2");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("card-0")
      .find("[data-test='card-drag-handle']")
      .focus()
      .should("have.focus");
    cy.realPress("Space");
    cy.realPress("ArrowRight");
    cy.wait(100);
    cy.realPress("ArrowDown");
    cy.wait(100);
    cy.realPress("Space");
    cy.getDataTest("column-0").find("[data-test=card-0]").should("not.exist");
    cy.getDataTest("column-1").find("[data-test=card-0]").should("exist");
  });
  it("should reorder columns with keyboard only", () => {
    cy.getDataTest("addBoardDialogTrigger")
      .should("contain.text", "New Board")
      .click();
    cy.getDataTest("dialogContent").should("be.visible");
    cy.getDataTest("boardNameInput").type("New board");
    cy.getDataTest("submitBoardForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type("New Column");
    cy.getDataTest("submitColumnForm").click();
    cy.getDataTest("addColumnButton").click();
    cy.getDataTest("columnNameInput").type(" 2");
    cy.getDataTest("submitColumnForm").click();

    cy.getDataTest("columnList").find("li").as("listItems");
    cy.get("@listItems").eq(0).should("contain", "New Column");
    cy.get("@listItems").eq(1).should("contain", "New Column 2");
    cy.getDataTest("column-0")
      .find("[data-test='column-drag-handle'")
      .focus()
      .should("have.focus");
    cy.realPress("Space");
    cy.realPress("ArrowRight");
    cy.wait(100);
    cy.realPress("ArrowDown");
    cy.wait(100);
    cy.realPress("Space");
    cy.get("@listItems").eq(0).should("contain", "New Column 2");
    cy.get("@listItems").eq(1).should("contain", "New Column");
  });
});
