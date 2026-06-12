<template>
  <BoardDropdown :boardId="board.id" />

  <div class="p-4 bg-(--accent-subtle) w-12.5 h-12.5 rounded-md">
    <KanbanSquare :size="18" />
  </div>
  <h4>{{ board.name }}</h4>
  <p class="text-sm text-(--secondary)">
    {{ board.description }}
  </p>
  <div
    class="flex justify-between items-center text-(--muted) font-mono text-xs"
  >
    <span class="flex gap-2 justify-center"
      ><Columns2 :size="14" />
      {{ columnCount > 0 ? columnCount : "No" }} columns</span
    ><span class="flex gap-2 justify-center"
      ><Clock :size="14" /> {{ timeAgo(board.updatedAt) }}</span
    >
  </div>
  <RouterLink
    :to="`/board/${board.id}`"
    class="absolute w-full h-full z-2 top-0 left-0"
  />
</template>

<script lang="ts" setup>
import { useColumnStore } from "@/stores/column";
import { type Board } from "@/types";
import timeAgo from "@/utils/timeAgo.ts";
import { Clock, Columns2, KanbanSquare } from "@lucide/vue";
import BoardDropdown from "./BoardDropdown.vue";
import { RouterLink } from "vue-router";
const { board } = defineProps<{
  board: Board;
}>();

const { columns } = useColumnStore();
const columnCount = Object.values(columns).filter(
  (c) => c.boardId === board.id,
).length;
</script>

<style></style>
