import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("deleteColumn", () => {
  it("should remove column from the store", () => {
    const { columnStore } = seedBasicBoard();
    columnStore.deleteColumn("col-1");
    expect(columnStore.columns["col-1"]).toBeUndefined();
  });
  it("should remove all cards belonging to deleted column", () => {
    const { columnStore, cardStore } = seedBasicBoard();

    columnStore.deleteColumn("col-1");

    const cardsInColumn = Object.values(cardStore.cards)
      .filter((card) => card.columnId === "col-1")
      .every((card) => card === undefined);
    expect(cardsInColumn).toBe(true);
  });
  it("should not have any orphaned cards left", () => {
    const { columnStore, cardStore } = seedBasicBoard();

    columnStore.deleteColumn("col-1");
    Object.values(cardStore.cards).forEach((card) => {
      const column = columnStore.columns[card.columnId];
      expect(column).toBeDefined();
    });
  });
  it("deleted column id is removed from board column ids", () => {
    const { columnStore, boardStore } = seedBasicBoard();
    columnStore.deleteColumn("col-1");
    const columnIds = boardStore.boards["board-1"].columnIds;
    expect(columnIds).not.toContain("col-1");
  });
  it("should not modify state if columnId is invalid", () => {
    const { columnStore } = seedBasicBoard();
    const columnsBefore = JSON.parse(JSON.stringify(columnStore.columns));
    expect(columnStore.deleteColumn("not-real")).toBeUndefined();
    expect(columnStore.columns).toEqual(columnsBefore);
  });
});
