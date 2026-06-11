import type { Card } from "@/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
export const useCardStore = defineStore("CardStore", () => {
  const cards: Ref<Card[] | undefined> = ref(undefined);
  function addCard(card: Card, colId: string) {
    if (cards.value) {
      const cardsInBoard = Object.values(cards.value).filter(
        (card) => card.columnId === colId,
      );
      if (cardsInBoard.length >= 50) {
        return;
      }
    }
    cards.value = [];
    cards.value.push(card);
  }
  function deleteCard(cardId: string) {
    cards.value = cards.value?.filter((card) => card.id !== cardId);
  }
  function editCard(cardId: string, editedCard: Card) {
    let card = cards.value?.find((card) => card.id === cardId);
    if (card) {
      card = editedCard;
    }
  }
  function getCard(cardId: string) {
    return cards.value?.filter((card) => card.id === cardId);
  }
  return { addCard, deleteCard, editCard, getCard };
});
