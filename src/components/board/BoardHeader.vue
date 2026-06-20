<template>
  <header
    class="bg-(--surface-2) flex justify-between items-center py-3 px-5 md:px-10 lg:px-20 w-full h-auto border-b border-(--border)"
  >
    <div class="flex justify-center flex-col gap-1 max-w-[60%]">
      <h1 class="truncate">{{ board.name }}</h1>
      <p class="flex gap-3 items-center font-mono text-xs text-(--muted)">
        <span>{{ columnCount > 0 ? columnCount : "No" }} columns</span>∙<span
          >{{ cardCount > 0 ? cardCount : "No" }} cards</span
        >
      </p>
    </div>
    <div class="flex gap-4 w-fit">
      <Button
        class="flex gap-3.5 text-(--secondary) border-(--border) border"
        variant="ghost"
        @click="exportBoard(board.id)"
        ><Download /> <span class="sr-only md:not-sr-only">Export</span></Button
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
import { useCardStore } from "@/stores/card.ts";

const { boardId } = defineProps<{ boardId: string }>();

const { boards } = storeToRefs(useBoardStore());
const { exportBoard } = useBoardStore();
const board = boards.value[boardId];
const { getColumnCount } = useColumnStore();
const { getCardCount } = useCardStore();
const columnCount = computed(() => getColumnCount(boardId));
const cardCount = computed(() => getCardCount(boardId));
</script>

<style></style>
