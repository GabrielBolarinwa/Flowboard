<template>
  <div class="flex flex-col gap-3 items-center justify-center text-center">
    <div
      class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
    >
      <KanbanSquare :size="32" />
    </div>
    <p>No cards yet</p>
    <p class="text-(--secondary)">Create a card below or in the menu above</p>
  </div>
</template>

<script lang="ts" setup>
import { KanbanSquare } from "@lucide/vue";
</script>

<style></style>
