import type { Column } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useColumnStore = defineStore("ColumnStore", () => {
  const columns = ref<Record<string, Column>>({});
  function addColumn(column: Column, boardId: string) {
    if (columns.value) {
      const columnsInBoard = Object.values(columns.value).filter(
        (col) => col.boardId === boardId,
      );
      if (columnsInBoard.length >= 6) {
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
