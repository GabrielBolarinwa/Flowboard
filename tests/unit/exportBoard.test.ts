// @vitest-environment happy-dom
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";
import { Card, Column } from "../../src/types";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("exportBoard", () => {
  let capturedBlob: Blob | null = null;
  beforeEach(() => {
    capturedBlob = null;
    globalThis.URL.createObjectURL = vi.fn((blob) => {
      capturedBlob = blob;
      return "mocked-object-url";
    });
    globalThis.URL.revokeObjectURL = vi.fn();
  });
  it("trigger a JSON file download", () => {
    const { boardStore } = seedBasicBoard();
    const createElemSpy = vi.spyOn(document, "createElement");

    boardStore.exportBoard("board-1");
    expect(createElemSpy).toHaveBeenCalledWith("a");

    expect(capturedBlob).toBeInstanceOf(Blob);
    expect(capturedBlob?.type).toBe("application/json");
  });
  it("should have only the correct board record", async () => {
    const { boardStore } = seedBasicBoard();

    boardStore.exportBoard("board-1");
    const blobContent = JSON.parse((await capturedBlob?.text()) as string);
    expect(blobContent.board.id).toBe("board-1");
  });
  it("should only contain columns belonging to the board", async () => {
    const { boardStore } = seedBasicBoard();

    boardStore.exportBoard("board-1");
    const blobContent = JSON.parse((await capturedBlob?.text()) as string);
    blobContent.columns.forEach((column: Column) => {
      expect(column.boardId).toBe("board-1");
    });
  });
  it("should only contain cards belonging to the columns in the board", async () => {
    const { boardStore } = seedBasicBoard();

    boardStore.exportBoard("board-1");
    const blobContent = JSON.parse((await capturedBlob?.text()) as string);
    const columnIds = blobContent.columns.map((column: Column) => column.id);
    const cards = blobContent.cards;
    cards.forEach((card: Card) => {
      expect(columnIds).toContain(card.columnId);
    });
  });
});
