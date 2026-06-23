import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Board, BoardFormValue } from "../../src/types";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

vi.mock("nanoid", () => ({
  nanoid: () => "board-id",
}));

const generateMockItems = (count: number) => {
  const mockStoreObject: Record<string, Board> = {};
  for (let i = 0; i < count; i++) {
    const id = `seeded-id-${i}`;
    mockStoreObject[id] = {
      id: id,
      name: `board-${i}`,
      description: "",
      columnIds: [],
      updatedAt: 0,
    };
  }
  return mockStoreObject;
};

describe("addBoard", () => {
  it("should add board", () => {
    const { boardStore } = seedBasicBoard();
    const board: BoardFormValue = {
      name: "Test Board",
    };
    boardStore.addBoard(board);
    expect(boardStore.boards["board-id"]).toBeDefined();
  });
  it("should return if board limit is reached", () => {
    const { boardStore } = seedBasicBoard();
    boardStore.boards = generateMockItems(10);
    const boardsBefore = JSON.parse(JSON.stringify(boardStore.boards));
    const board: BoardFormValue = {
      name: "Test Board",
    };
    expect(boardStore.addBoard(board)).toBeUndefined();
    expect(boardStore.boards).toEqual(boardsBefore);
  });
});
