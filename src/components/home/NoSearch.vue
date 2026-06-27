<template>
  <div
    class="flex flex-col gap-6 mt-9 items-center justify-center"
    data-test="noResults"
  >
    <div
      class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
    >
      <SearchX aria-hidden :size="32" />
    </div>
    <p>No boards match</p>
    <p class="text-(--secondary)">
      Try a different search term, or create a new board
    </p>
    <AddBoard trigger="secondary_button" />
  </div>
</template>

<script lang="ts" setup>
import { SearchX } from "@lucide/vue";
import AddBoard from "./AddBoard.vue";
</script>

<style></style>
