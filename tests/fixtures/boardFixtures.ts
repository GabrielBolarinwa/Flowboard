import { useBoardStore } from "../../src/stores/board";
import { useCardStore } from "../../src/stores/card";
import { useColumnStore } from "../../src/stores/column";
export function seedBasicBoard() {
  const boardStore = useBoardStore();
  const columnStore = useColumnStore();
  const cardStore = useCardStore();

  boardStore.boards["board-1"] = {
    id: "board-1",
    name: "Test Board",
    description: null,
    updatedAt: 0,
    columnIds: ["col-1", "col-2"],
  };

  columnStore.columns["col-1"] = {
    id: "col-1",
    boardId: "board-1",
    name: "To Do",
    cardIds: ["card-1"],
    wipLimit: null,
  };

  columnStore.columns["col-2"] = {
    id: "col-2",
    boardId: "board-1",
    name: "In Progress",
    cardIds: [],
    wipLimit: null,
  };

  cardStore.cards["card-1"] = {
    id: "card-1",
    columnId: "col-1",
    title: "Test Card",
    description: "",
    status: "todo",
    priority: "medium",
    dueDate: null,
    assignee: null,
    activity: [],
  };

  return { boardStore, columnStore, cardStore };
}
