import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("activity log changes", () => {
  it("should log activity entry on card edit", () => {
    const { cardStore } = seedBasicBoard();
    cardStore.editCard("card-1", {
      title: "Updated",
      status: "todo",
      priority: "medium",
    });
    const entry = cardStore.cards["card-1"].activity.at(-1);
    expect(entry?.message).toBe("Edited card data");
    expect(entry?.timestamp).toBeTypeOf("number");
  });
});
