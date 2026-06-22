import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it /* , Mock, vi */ } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";
// import { ExternalToast, toast } from "vue-sonner";
// import { Component } from "vue";
beforeEach(() => {
  setActivePinia(createPinia());
});
describe("moveCard", () => {
  /* let toastSpy: Mock<
    (
      message: string | (() => string | Component) | Component,
      data?: ExternalToast,
    ) => string | number
  >;

  beforeEach(() => {
    toastSpy = vi.spyOn(toast, "warning");
  }); */

  it("updates card.columnId to the destination column", () => {
    const { cardStore } = seedBasicBoard();
    cardStore.moveCard("card-1", "col-2");
    expect(cardStore.cards["card-1"].columnId).toBe("col-2");
  });

  it("creates new activity entry", () => {
    const { cardStore } = seedBasicBoard();
    cardStore.moveCard("card-1", "col-2");
    const entry = cardStore.cards["card-1"].activity.at(-1);
    expect(entry.message).toBe("Moved to In Progress");
    expect(typeof entry.timestamp).toBe("number");
  });

  it("does nothing when the destination is the same", async () => {
    const { cardStore } = seedBasicBoard();
    cardStore.moveCard("card-1", "col-1");
    expect(cardStore.cards["card-1"].columnId).toBe("col-1");
    expect(cardStore.cards["card-1"].activity).toHaveLength(0);
  });

  it("exits without mutating state on invalid cardId", () => {
    const { cardStore } = seedBasicBoard();
    cardStore.moveCard("not-real", "col-2");
    expect(cardStore.cards["card-1"].columnId).toBe("col-1");
    expect(cardStore.cards["card-1"].activity).toHaveLength(0);
  });

  it("exits without mutating state on invalid toColId", () => {
    const { cardStore } = seedBasicBoard();
    cardStore.moveCard("card-1", "not-real");
    expect(cardStore.cards["card-1"].columnId).toBe("col-1");
    expect(cardStore.cards["card-1"].activity).toHaveLength(0);
  });

  it("updates board.updatedAt on successful move", () => {
    const { boardStore, cardStore } = seedBasicBoard();
    cardStore.moveCard("card-1", "col-2");
    expect(boardStore.boards["board-1"].updatedAt).toBeGreaterThan(0);
  });
});
