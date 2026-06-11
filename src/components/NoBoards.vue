<template>
  <div class="flex flex-col gap-6 mt-9 items-center justify-center hidden">
    <div
      class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
    >
      <KanbanSquare :size="32" />
    </div>
    <p>No boards yet</p>
    <p class="text-(--secondary)">
      Create your first board to start organizing your tasks
    </p>
    <button
      class="bg-(--accent-subtle) border border-(--border) hover:border-(--border-focus) py-1.5 px-3 flex justify-center items-center gap-2 rounded-md"
    >
      <Plus /> New Board
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@lucide/vue";
</script>

<style></style>
