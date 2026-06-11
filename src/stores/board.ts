import type { Board } from "@/types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
export const useBoardStore = defineStore("BoardStore", () => {
  const boards: Ref<Board[] | undefined> = ref(undefined);
  function addBoard(board: Board) {
    if (boards.value && boards.value?.length >= 10) {
      return;
    }
    boards.value = [];
    boards.value.push(board);
  }
  function deleteBoard(boardId: string) {
    boards.value = boards.value?.filter((board) => board.id !== boardId);
  }
  function editBoard(boardId: string, editedBoard: Board) {
    const board = boards.value?.find((board) => board.id === boardId);
    if (board) {
      board.name = editedBoard.name;
    }
  }
  function getBoard(boardId: string) {
    return boards.value?.filter((board) => board.id === boardId);
  }
  return { addBoard, deleteBoard, editBoard, getBoard };
});
