<template>
  <div
    class="flex flex-col gap-6 mt-9 items-center justify-center"
    data-test="noBoardsPrompt"
  >
    <div
      class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
    >
      <KanbanSquare aria-hidden :size="32" />
    </div>
    <p>No boards yet</p>
    <p class="text-(--secondary)">
      Create your first board to start organizing your tasks
    </p>
    <AddBoard trigger="secondary_button" />
  </div>
</template>

<script lang="ts" setup>
import { KanbanSquare } from "@lucide/vue";
import AddBoard from "./AddBoard.vue";
</script>

<style></style>
