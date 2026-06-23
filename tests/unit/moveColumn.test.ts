import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("moveColumn", () => {
  it("should change column order in board columnIds", () => {
    const { columnStore, boardStore } = seedBasicBoard();
    columnStore.moveColumn("col-1", "board-1", 1);
    expect(boardStore.boards["board-1"].columnIds[1]).toBe("col-1");
  });
  it("should move to index 0 correctly", () => {
    const { columnStore, boardStore } = seedBasicBoard();
    columnStore.moveColumn("col-1", "board-1", 0);

    expect(boardStore.boards["board-1"].columnIds[0]).toBe("col-1");
  });
  it("should move to last index correctly", () => {
    const { columnStore, boardStore } = seedBasicBoard();
    const lastIndex = boardStore.boards["board-1"].columnIds.length - 1;
    columnStore.moveColumn("col-1", "board-1", lastIndex);
    expect(boardStore.boards["board-1"].columnIds[lastIndex]).toBe("col-1");
  });
});
