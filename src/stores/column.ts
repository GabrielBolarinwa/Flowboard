import type { Column, ColumnFormValue } from "@/types";
import { nanoid } from "nanoid";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useBoardStore } from "./board";
import { useCardStore } from "./card";
export const useColumnStore = defineStore(
  "ColumnStore",
  () => {
    const columns = ref<Record<string, Column>>({});
    function addColumn(columnFormValue: ColumnFormValue, boardId: string) {
      const { boards } = storeToRefs(useBoardStore());

      const column: Column = {
        id: nanoid(Math.round(15.75)),
        name: columnFormValue.name,
        boardId: boardId,
        cardIds: [],
        wipLimit: null,
      };
      if (columns.value) {
        const columnsInBoard = Object.values(columns.value).filter(
          (col) => col.boardId === boardId,
        );
        if (columnsInBoard.length >= 6) {
          toast.error("Column limit reached — maximum 6 columns per board");
          return;
        }
      }

      columns.value[column.id] = column;

      boards.value[boardId].columnIds.push(column.id);
      boards.value[boardId].updatedAt = Date.now();
      toast.success("Column was successfully created");
    }
    function deleteColumn(columnId: string) {
      const { boards } = storeToRefs(useBoardStore());
      const { cards } = storeToRefs(useCardStore());

      const column = columns.value[columnId];
      if (!column) return;
      column.cardIds.forEach((cardId) => delete cards.value[cardId]);
      boards.value[column.boardId].columnIds = boards.value[
        column.boardId
      ].columnIds.filter((id) => id !== columnId);
      delete columns.value[columnId];
      boards.value[column.boardId].updatedAt = Date.now();
    }
    function editColumn(
      columnId: string,
      editedColumn: { name: string; wipLimit: number | null },
    ) {
      const { boards } = storeToRefs(useBoardStore());

      const column = columns.value[columnId];
      columns.value[columnId] = {
        ...column,
        ...editedColumn,
      };
      boards.value[column.boardId].updatedAt = Date.now();
    }
    function getColumn(columnId: string) {
      return columns.value[columnId];
    }
    function getColumnCount(boardId: string) {
      return Object.values(columns.value).filter((c) => c.boardId === boardId)
        .length;
    }

    return {
      columns,
      addColumn,
      deleteColumn,
      editColumn,
      getColumn,
      getColumnCount,
    };
  },
  { persist: true },
);
