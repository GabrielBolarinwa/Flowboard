import type { Card, CardFormValue } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useColumnStore } from "./column";
import { useBoardStore } from "./board";
import { nanoid } from "nanoid";
export const useCardStore = defineStore(
  "CardStore",
  () => {
    const cards = ref<Record<string, Card>>({});
    function addCard(
      cardFormValue: CardFormValue,
      colId: string,
      boardId: string,
    ) {
      const { columns } = useColumnStore();
      const { boards } = storeToRefs(useBoardStore());

      if (cards.value) {
        const cardsInColumn = Object.values(cards.value).filter(
          (card) => card.columnId === colId,
        );
        if (cardsInColumn.length >= 50) {
          toast.error("Card limit reached — maximum 50 cards per column");
          return;
        }
      }
      const card: Card = {
        ...cardFormValue,
        id: nanoid(30),
        columnId: colId,
        activity: [
          { message: `Created ${cardFormValue.title}`, timestamp: Date.now() },
        ],
      };
      cards.value[card.id] = card;
      columns[colId].cardIds.push(card.id);
      boards.value[boardId].updatedAt = Date.now();
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
      const { columns } = storeToRefs(useColumnStore());
      return Object.values(columns.value)
        .filter((col) => col.boardId === boardId)
        .reduce((total, col) => total + col.cardIds.length, 0);
    }

    return { cards, addCard, deleteCard, editCard, getCard, getCardCount };
  },
  { persist: true },
);
