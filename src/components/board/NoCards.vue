<template>
  <div
    class="flex flex-col gap-3 items-center justify-center text-center absolute top-1/2 -translate-y-1/2" data-test="noCardsPrompt"
  >
    <div
      class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
    >
      <KanbanSquare aria-hidden :size="32" />
    </div>
    <p>No cards yet</p>
    <p class="text-(--secondary)">Create a card below or in the menu above</p>
  </div>
</template>

<script lang="ts" setup>
import { KanbanSquare } from "@lucide/vue";
</script>

<style></style>
