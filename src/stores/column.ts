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
      const { updateBoardLastUpdated } = useBoardStore();
      if (!boards.value[boardId]) return;

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
      updateBoardLastUpdated(boardId);
      toast.success("Column was successfully created");
    }
    function deleteColumn(columnId: string) {
      const { boards } = storeToRefs(useBoardStore());
      const { cards } = storeToRefs(useCardStore());
      const { updateBoardLastUpdated } = useBoardStore();

      const column = columns.value[columnId];
      if (!column) return;
      column.cardIds.forEach((cardId) => delete cards.value[cardId]);
      boards.value[column.boardId].columnIds = boards.value[
        column.boardId
      ].columnIds.filter((id) => id !== columnId);
      delete columns.value[columnId];
      updateBoardLastUpdated(column.boardId);
    }
    function editColumn(
      columnId: string,
      editedColumn: { name: string; wipLimit: number | null },
    ) {
      const { updateBoardLastUpdated } = useBoardStore();

      const column = columns.value[columnId];
      columns.value[columnId] = {
        ...column,
        ...editedColumn,
      };
      updateBoardLastUpdated(column.boardId);
    }
    function getColumn(columnId: string) {
      return columns.value[columnId];
    }
    function getColumnCount(boardId: string) {
      return Object.values(columns.value).filter((c) => c.boardId === boardId)
        .length;
    }
    function moveColumn(columnId: string, boardId: string, toIndex: number) {
      const { boards } = storeToRefs(useBoardStore());
      const { updateBoardLastUpdated } = useBoardStore();

      const board = boards.value[boardId];
      if (!board) return;
      const ids = [...board.columnIds];
      const fromIndex = ids.indexOf(columnId);
      if (fromIndex === -1 || fromIndex === toIndex) return;
      ids.splice(fromIndex, 1);
      ids.splice(toIndex, 0, columnId);
      board.columnIds = ids;
      updateBoardLastUpdated(boardId);
    }

    return {
      columns,
      addColumn,
      deleteColumn,
      editColumn,
      getColumn,
      getColumnCount,
      moveColumn,
    };
  },
  { persist: true },
);
