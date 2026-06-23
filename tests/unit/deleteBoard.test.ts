import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("deleteBoard", () => {
  it("should delete board for state store", () => {
    const { boardStore } = seedBasicBoard();
    boardStore.deleteBoard("board-1");
    expect(boardStore.boards["board-1"]).toBeUndefined();
  });
  it("should delete all cards and columns belonging to board", () => {
    const { boardStore, columnStore, cardStore } = seedBasicBoard();
    const columnIds = [...boardStore.boards["board-1"].columnIds];
    const columnsInBoard = Object.values(columnStore.columns).filter(
      (column) => column.boardId === boardStore.boards["board-1"].id,
    );
    const cardIds = columnsInBoard.flatMap((column) => column.cardIds);
    boardStore.deleteBoard("board-1");
    columnIds.forEach((columnId) => {
      expect(columnStore.columns[columnId]).toBeUndefined();
    });

    cardIds.forEach((cardId) => {
      expect(cardStore.cards[cardId]).toBeUndefined();
    });
  });
  it("should prove that all remaining columns and cards are not orphaned", () => {
    const { boardStore, columnStore, cardStore } = seedBasicBoard();
    boardStore.deleteBoard("board-1");
    Object.values(columnStore.columns).forEach((column) => {
      expect(boardStore.boards[column.boardId]).toBeDefined();
    });
    Object.values(cardStore.cards).forEach((card) => {
      expect(columnStore.columns[card.columnId]).toBeDefined();
    });
  });
  it("should return early without mutation", () => {
    const { boardStore } = seedBasicBoard();
    const boardsBefore = JSON.parse(JSON.stringify(boardStore.boards));
    expect(boardStore.deleteBoard("not-real")).toBeUndefined();
    expect(boardStore.boards).toEqual(boardsBefore);
  });
});
