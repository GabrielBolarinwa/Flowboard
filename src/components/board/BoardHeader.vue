<template>
  <header
    class="bg-(--surface-2) flex justify-between items-center py-3 px-20 w-full h-auto border-b border-(--border)"
  >
    <div class="flex justify-center flex-col gap-1">
      <h1>{{ board.name }}</h1>
      <p class="flex gap-3 items-center font-mono text-xs text-(--muted)">
        <span>{{ columnCount > 0 ? columnCount : "No" }} columns</span>∙<span
          >{{ cardCount > 0 ? columnCount : "No" }} cards</span
        >
      </p>
    </div>
    <div class="flex gap-4">
      <Button
        class="flex gap-3.5 text-(--secondary) border-(--border)"
        variant="outline"
        ><Download /> Export</Button
      >
      <AddColumnPopover :boardId="boardId" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useBoardStore } from "@/stores/board";
import { useColumnStore } from "@/stores/column";
import { Download } from "@lucide/vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Button from "../ui/button/Button.vue";
import AddColumnPopover from "./AddColumnPopover.vue";

const { boardId } = defineProps<{ boardId: string }>();

const { boards } = storeToRefs(useBoardStore());
const board = boards.value[boardId];
const { columns } = storeToRefs(useColumnStore());
const columnCount = computed(
  () =>
    Object.values(columns.value).filter((c) => c.boardId === boardId).length,
);
const cardCount = computed(() =>
  Object.values(columns.value)
    .filter((col) => col.boardId === boardId)
    .reduce((total, col) => total + col.cardIds.length, 0),
);
</script>

<style></style>
