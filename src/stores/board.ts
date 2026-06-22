import type { Board, BoardFormValue } from "@/types";
import getObjectLength from "@/utils/getObjectLength";
import { nanoid } from "nanoid";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useCardStore } from "./card";
import { useColumnStore } from "./column";
export const useBoardStore = defineStore(
  "BoardStore",
  () => {
    const boards = ref<Record<string, Board>>({});
    const { columns } = storeToRefs(useColumnStore());
    const { cards } = storeToRefs(useCardStore());
    function addBoard(boardFormValues: BoardFormValue) {
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
      return board.id;
    }
    function deleteBoard(boardId: string) {
      const board = boards.value[boardId];
      if (!board) return;
      board.columnIds.forEach((columnId) => delete columns.value[columnId]);
      delete boards.value[boardId];
    }
    function editBoard(
      boardId: string,
      editedBoard: { name: string; description?: string },
    ) {
      const boardToEdit = boards.value[boardId];
      boards.value[boardId] = { ...boardToEdit, ...editedBoard };
      updateBoardLastUpdated(boardId);
    }
    function getBoard(boardId: string) {
      return boards.value[boardId];
    }
    function exportBoard(boardId: string) {
      const board = boards.value[boardId];
      const boardColumns = Object.values(columns.value).filter(
        (c) => c.boardId === boardId,
      );
      const columnCards = boardColumns.flatMap((col) =>
        col.cardIds.map((id) => cards.value[id]),
      );

      const blob = new Blob(
        [
          JSON.stringify(
            { board, columns: boardColumns, cards: columnCards },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${board.name}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    function updateBoardLastUpdated(boardId: string) {
      boards.value[boardId].updatedAt = Date.now();
    }

    return {
      boards,
      addBoard,
      deleteBoard,
      editBoard,
      getBoard,
      exportBoard,
      updateBoardLastUpdated,
    };
  },
  { persist: true },
);
