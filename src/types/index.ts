export interface Board {
  id: string;
  name: string;
  description: string | undefined;
  columnIds: string[];
  updatedAt: number;
}

export interface Column {
  id: string;
  boardId: string;
  name: string;
  cardIds: string[];
  wipLimit: number | null;
}

export interface Card {
  id: string;
  columnId: string;
  title: string;
  description?: string | undefined;
  status:
    | "todo"
    | "in-progress"
    | "in-review"
    | "blocked"
    | "done"
    | "cancelled";
  priority?: "low" | "medium" | "high";
  dueDate?: string | undefined;
  assignee?: string | undefined;
  activity: ActivityEntry[];
}

interface ActivityEntry {
  message: string;
  timestamp: number;
}

export interface BoardFormValue {
  name: string;
  description?: string;
}
export interface ColumnFormValue {
  name: string;
}

export interface CardFormValue {
  title: string;
  status: status;
  priority: "low" | "medium" | "high";
  description?: string | undefined;
  assignee?: string | undefined;
  dueDate?: string | undefined;
}

export type status =
  | "todo"
  | "in-progress"
  | "in-review"
  | "blocked"
  | "done"
  | "cancelled";
