import type { Column } from "@/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
export const useColumnStore = defineStore("ColumnStore", () => {
  const columns: Ref<Column[] | undefined> = ref(undefined);
  function addColumn(column: Column) {
    if (columns.value && columns.value?.length >= 10) {
      return;
    }
    columns.value = [];
    columns.value.push(column);
  }
  function deleteColumn(columnId: string) {
    columns.value = columns.value?.filter((column) => column.id !== columnId);
  }
  function editColumn(columnId: string, editedColumn: Column) {
    let column = columns.value?.find((column) => column.id === columnId);
    if (column) {
      column = editedColumn;
    }
  }
  function getColumn(columnId: string) {
    return columns.value?.filter((column) => column.id === columnId);
  }
  return { addColumn, deleteColumn, editColumn, getColumn };
});
