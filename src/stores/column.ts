import type { Column } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
export const useColumnStore = defineStore("ColumnStore", () => {
  const columns = ref<Record<string, Column>>({});
  function addColumn(column: Column, boardId: string) {
    if (columns.value) {
      const columnsInBoard = Object.values(columns.value).filter(
        (col) => col.boardId === boardId,
      );
      if (columnsInBoard.length >= 6) {
        toast.error("Column limit reached — maximum 6 columns per board");
        return;
      }
      if (
        columns.value[column.id].wipLimit &&
        columnsInBoard.length >= columns.value[column.id].wipLimit!
      ) {
        toast.warning("WIP limit reached for this column");
        return;
      }
    }
    columns.value[column.id] = column;
  }
  function deleteColumn(columnId: string) {
    delete columns.value[columnId];
  }
  function editColumn(columnId: string, editedColumn: Column) {
    columns.value[columnId] = editedColumn;
  }
  function getColumn(columnId: string) {
    return columns.value[columnId];
  }
  return { columns, addColumn, deleteColumn, editColumn, getColumn };
});
