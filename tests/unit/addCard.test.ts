import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Card, CardFormValue } from "../../src/types";
import { seedBasicBoard } from "../fixtures/boardFixtures";

beforeEach(() => {
  setActivePinia(createPinia());
});

vi.mock("nanoid", () => ({
  nanoid: () => "card-id",
}));
const generateMockItems = (count: number) => {
  const mockStoreObject: Record<string, Card> = {};
  for (let i = 0; i < count; i++) {
    const id = `seeded-id-${i}`;
    mockStoreObject[id] = {
      id: id,
      title: `title-${i}`,
      status: "todo",
      priority: "medium",
      columnId: "col-1",
      activity: [],
    };
  }
  return mockStoreObject;
};

describe("addCard", () => {
  it("should add card to card store", () => {
    const { cardStore } = seedBasicBoard();
    const card: CardFormValue = {
      title: "New card",
      status: "todo",
      priority: "medium",
    };
    cardStore.addCard(card, "col-1", "board-1");
    expect(cardStore.cards["card-id"]).toBeDefined();
  });
  it("should append the new id to columnIds", () => {
    const { columnStore, cardStore } = seedBasicBoard();
    const card: CardFormValue = {
      title: "New card",
      status: "todo",
      priority: "medium",
    };
    cardStore.addCard(card, "col-1", "board-1");
    expect(columnStore.columns["col-1"].cardIds).toContain("card-id");
  });
  it("should not add card if column limit is reach", () => {
    const { cardStore, columnStore } = seedBasicBoard();
    cardStore.cards = generateMockItems(50);
    columnStore.columns["col-1"].cardIds = Object.values(cardStore.cards).map(
      (card) => card.columnId === "col-1" && card.id,
    );
    const card: CardFormValue = {
      title: "New card",
      status: "todo",
      priority: "medium",
    };
    cardStore.addCard(card, "col-1", "board-1");
    const lastItem =
      cardStore.cards[
        Object.keys(cardStore.cards)[Object.keys(cardStore.cards).length - 1]
      ];
    expect(lastItem).not.toEqual({
      id: expect.any(String),
      ...card,
    });
    expect(Object.keys(cardStore.cards)).length(50);
  });
  it("should not add card if column WIP limit is reached", () => {
    const { cardStore, columnStore } = seedBasicBoard();
    columnStore.columns["col-1"].wipLimit = 1;
    cardStore.cards = generateMockItems(1);
    const card: CardFormValue = {
      title: "New card",
      status: "todo",
      priority: "medium",
    };
    cardStore.addCard(card, "col-1", "board-1");
    const lastItem =
      cardStore.cards[
        Object.keys(cardStore.cards)[Object.keys(cardStore.cards).length - 1]
      ];
    expect(lastItem).not.toEqual({
      id: expect.any(String),
      ...card,
    });
    expect(Object.keys(cardStore.cards)).length(1);
  });
  it("should do nothing add if columnId is invalid", () => {
    const { cardStore } = seedBasicBoard();
    const card: CardFormValue = {
      title: "New card",
      status: "todo",
      priority: "medium",
    };
    const cardsBefore = JSON.parse(JSON.stringify(cardStore.cards));
    cardStore.addCard(card, "not-real", "board-1");

    expect(cardStore.cards).toEqual(cardsBefore);
    expect(Object.keys(cardStore.cards)).length(4);
  });
  it("should add activity entry on successfully addition", () => {
    const { cardStore } = seedBasicBoard();
    const card: CardFormValue = {
      title: "New card",
      status: "todo",
      priority: "medium",
    };
    cardStore.addCard(card, "col-1", "board-1");
    const cardActivity = cardStore.cards["card-id"].activity;
    expect(cardActivity[0].message).toBe("Created New card");
    expect(cardActivity[0].timestamp).toBeGreaterThan(0);
  });
});
