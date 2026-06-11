<template>
  <div class="flex flex-col gap-6 mt-9 items-center justify-center hidden">
    <div
      class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
    >
      <SearchX :size="32" />
    </div>
    <p>No boards match</p>
    <p class="text-(--secondary)">
      Try a different search term, or create a new board
    </p>
    <button
      class="bg-(--accent-subtle) border border-(--border) hover:border-(--border-focus) py-1.5 px-3 flex justify-center items-center gap-2 rounded-md"
    >
      <Plus /> New Board
    </button>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
