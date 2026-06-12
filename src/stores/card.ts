import type { Card } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
export const useCardStore = defineStore("CardStore", () => {
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
  return { cards, addCard, deleteCard, editCard, getCard };
});
