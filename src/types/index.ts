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
  description: string;
  status:
    | "todo"
    | "in-progress"
    | "in-review"
    | "blocked"
    | "done"
    | "cancelled";
  priority: "low" | "medium" | "high";
  dueDate: number | undefined;
  assignee: string | undefined;
  activity: ActivityEntry[];
}

interface ActivityEntry {
  message: string;
  timestamp: number;
}
