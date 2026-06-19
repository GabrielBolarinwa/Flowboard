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
        const column = columns[colId];
        if (column.wipLimit && cardsInColumn.length >= column.wipLimit) {
          toast.warning("WIP limit has been reached for this column");
        }
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
      const { boards } = storeToRefs(useBoardStore());
      const { columns } = storeToRefs(useColumnStore());
      const card = cards.value[cardId];
      if (!card) return;
      columns.value[card.columnId].cardIds = columns.value[
        card.columnId
      ].cardIds.filter((id) => id !== cardId);
      delete cards.value[cardId];
      boards.value[columns.value[card.columnId]?.boardId].updatedAt =
        Date.now();
    }
    function editCard(cardId: string, cardFormValue: CardFormValue) {
      const { boards } = storeToRefs(useBoardStore());
      const { columns } = storeToRefs(useColumnStore());
      const initialCard = cards.value[cardId];
      const editedCard: Card = {
        ...initialCard,
        ...cardFormValue,
        activity: [
          ...initialCard.activity,
          { message: `Edited card data`, timestamp: Date.now() },
        ],
      };
      cards.value[cardId] = editedCard;
      boards.value[columns.value[initialCard.columnId]?.boardId].updatedAt =
        Date.now();
    }
    function titleCardEdit(cardId: string, title: string) {
      const { boards } = storeToRefs(useBoardStore());
      const { columns } = storeToRefs(useColumnStore());
      const initialCard = cards.value[cardId];
      const editedCard: Card = {
        ...initialCard,
        title,
        activity: [
          ...initialCard.activity,
          {
            message: `Changed title from ${initialCard.title} to ${title}`,
            timestamp: Date.now(),
          },
        ],
      };
      cards.value[cardId] = editedCard;
      boards.value[columns.value[initialCard.columnId]?.boardId].updatedAt =
        Date.now();
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

    return {
      cards,
      addCard,
      deleteCard,
      editCard,
      getCard,
      getCardCount,
      titleCardEdit,
    };
  },
  { persist: true },
);
