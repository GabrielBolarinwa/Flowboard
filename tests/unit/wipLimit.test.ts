import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("WIP limit via editColumn", () => {
  it("should set wipLimit when provided", () => {
    const { columnStore } = seedBasicBoard();
    columnStore.editColumn("col-1", { name: "Todo", wipLimit: 5 });
    expect(columnStore.columns["col-1"].wipLimit).toBe(5);
  });
  it("should clear wipLimit when null iş passed", () => {
    const { columnStore } = seedBasicBoard();
    columnStore.columns["col-1"].wipLimit = 5;
    columnStore.editColumn("col-1", { name: "Todo", wipLimit: null });
    expect(columnStore.columns["col-1"].wipLimit).toBeNull();
  });
});
