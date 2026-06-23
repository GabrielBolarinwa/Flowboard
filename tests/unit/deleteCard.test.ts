import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { seedBasicBoard } from "../fixtures/boardFixtures";
import { Card } from "../../src/types";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("deleteCard", () => {
  it("should delete card from the store", () => {
    const { cardStore } = seedBasicBoard();
    cardStore.deleteCard("card-1");
    expect(cardStore.cards["card-1"]).toBeUndefined();
  });
  it("should remove id from column cardIds", () => {
    const { cardStore, columnStore } = seedBasicBoard();
    cardStore.deleteCard("card-1");
    const column = columnStore.columns["col-1"];
    expect(column.cardIds).not.toContain("card-1");
  });
  it("column cardIds does not contain any orphaned references", () => {
    const { cardStore, columnStore } = seedBasicBoard();
    cardStore.deleteCard("card-1");
    const column = columnStore.columns["col-1"];
    const cardsInColumn = column.cardIds.map(
      (cardId: string) => cardStore.cards[cardId],
    );
    cardsInColumn.forEach((card: Card) => {
      expect(card).toBeDefined();
    });
  });
  it("does nothing if cardId is invalid", () => {
    const { cardStore } = seedBasicBoard();
    const cardsBefore = JSON.parse(JSON.stringify(cardStore.cards));
    cardStore.deleteCard("not-real");
    expect(cardStore.cards).toEqual(cardsBefore);
  });
});
