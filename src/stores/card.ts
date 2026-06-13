import type { Card } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useColumnStore } from "./column";
export const useCardStore = defineStore("CardStore", () => {
  const { columns } = storeToRefs(useColumnStore());
  const cards = ref<Record<string, Card>>({});
  function addCard(card: Card, colId: string) {
    if (cards.value) {
      const cardsInBoard = Object.values(cards.value).filter(
        (card) => card.columnId === colId,
      );
      if (cardsInBoard.length >= 50) {
        toast.error("Card limit reached — maximum 50 cards per column");
        return;
      }
    }
    cards.value[card.id] = card;
  }
  function deleteCard(cardId: string) {
    delete cards.value[cardId];
  }
  function editCard(cardId: string, editedCard: Card) {
    cards.value[cardId] = editedCard;
  }
  function getCard(cardId: string) {
    return cards.value[cardId];
  }
  function getCardCount(boardId: string) {
    return Object.values(columns.value)
      .filter((col) => col.boardId === boardId)
      .reduce((total, col) => total + col.cardIds.length, 0);
  }

  return { cards, addCard, deleteCard, editCard, getCard, getCardCount };
});
