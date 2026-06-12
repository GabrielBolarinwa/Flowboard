import type { Board } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useBoardStore = defineStore("BoardStore", () => {
  const boards = ref<Record<string, Board>>({});
  function addBoard(board: Board) {
    if (boards.value && Object.keys(boards.value).length >= 10) {
      return;
    }
    boards.value[board.id] = board;
  }
  function deleteBoard(boardId: string) {
    delete boards.value[boardId];
  }
  function editBoard(boardId: string, editedBoard: Board) {
    boards.value[boardId] = editedBoard;
  }
  function getBoard(boardId: string) {
    return boards.value[boardId];
  }
  return { boards, addBoard, deleteBoard, editBoard, getBoard };
});
