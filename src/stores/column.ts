import type { Column } from "@/types";
import { nanoid } from "nanoid";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useBoardStore } from "./board";
export const useColumnStore = defineStore(
  "ColumnStore",
  () => {
    const columns = ref<Record<string, Column>>({});
    const { boards } = storeToRefs(useBoardStore());
    function addColumn(columnFormValue: { name: string }, boardId: string) {
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
      toast.success("Column was successfully created");
    }
    function deleteColumn(columnId: string) {
      delete columns.value[columnId];
    }
    function editColumn(
      columnId: string,
      editedColumn: { name: string; wipLimit: number | null },
    ) {
      const initialColumn = columns.value[columnId];
      columns.value[columnId] = {
        ...initialColumn,
        ...editedColumn,
      };
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
