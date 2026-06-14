import { router } from "@/router";
import type { Board } from "@/types";
import getObjectLength from "@/utils/getObjectLength";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
export const useBoardStore = defineStore(
  "BoardStore",
  () => {
    const boards = ref<Record<string, Board>>({});
    function addBoard(boardFormValues: { name: string; description?: string }) {
      if (boards.value && getObjectLength(boards.value) >= 10) {
        toast.error("Board limit reached — maximum 10 boards");
        return;
      }
      const board: Board = {
        id: nanoid(),
        name: boardFormValues.name,
        description: boardFormValues.description || "",
        columnIds: [],
        updatedAt: Date.now(),
      };
      boards.value[board.id] = board;
      toast.success("Board was created successfully");
      setTimeout(() => {
        router.push(`/board/${board.id}`);
      }, 500);
    }
    function deleteBoard(boardId: string) {
      delete boards.value[boardId];
    }
    function editBoard(
      boardId: string,
      editedBoard: { name: string; description?: string },
    ) {
      const boardToEdit = boards.value[boardId];
      boards.value[boardId] = { ...boardToEdit, ...editedBoard };
    }
    function getBoard(boardId: string) {
      return boards.value[boardId];
    }
    return { boards, addBoard, deleteBoard, editBoard, getBoard };
  },
  { persist: true },
);
