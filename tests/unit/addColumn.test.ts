import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Column, ColumnFormValue } from "../../src/types";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

vi.mock("nanoid", () => ({
  nanoid: () => "column-id",
}));

const generateMockItems = (count: number) => {
  const mockStoreObject: Record<string, Column> = {};
  for (let i = 0; i < count; i++) {
    const id = `seeded-id-${i}`;
    mockStoreObject[id] = {
      id: id,
      name: `board-${i}`,
      boardId: "board-1",
      cardIds: [],
      wipLimit: null,
    };
  }
  return mockStoreObject;
};

describe("addColumn", () => {
  it("should add new column", () => {
    const { columnStore } = seedBasicBoard();
    const column: ColumnFormValue = {
      name: "New Column",
    };
    columnStore.addColumn(column, "board-1");
    expect(columnStore.columns["column-id"]).toBeDefined();
  });
  it("should have a valid boardId", () => {
    const { columnStore, boardStore } = seedBasicBoard();
    const column: ColumnFormValue = {
      name: "New Column",
    };
    columnStore.addColumn(column, "board-1");
    expect(
      boardStore.boards[columnStore.columns["column-id"].boardId],
    ).toBeDefined();
  });
  it("should append columnId to board column Id array", () => {
    const { columnStore, boardStore } = seedBasicBoard();
    const column: ColumnFormValue = {
      name: "New Column",
    };
    columnStore.addColumn(column, "board-1");
    expect(boardStore.boards["board-1"].columnIds).toContain("column-id");
  });
  it("should do nothing when board limit is reached", () => {
    const { boardStore, columnStore } = seedBasicBoard();
    columnStore.columns = generateMockItems(6);
    boardStore.boards["board-1"].columnIds = Object.values(columnStore.columns)
      .filter((column) => column.boardId === "board-1")
      .map((column) => column.id);
    const columnsBefore = JSON.parse(JSON.stringify(columnStore.columns));
    const column: ColumnFormValue = {
      name: "New Column",
    };
    expect(columnStore.addColumn(column, "board-1")).toBeUndefined();
    expect(columnStore.columns).toEqual(columnsBefore);
  });
  it("should do nothing if boardId is invalid", () => {
    const { columnStore } = seedBasicBoard();
    const columnsBefore = JSON.parse(JSON.stringify(columnStore.columns));
    const column: ColumnFormValue = {
      name: "New Column",
    };
    expect(columnStore.addColumn(column, "not-real")).toBeUndefined();
    expect(columnStore.columns).toEqual(columnsBefore);
  });
});
