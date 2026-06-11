<template>
  <div>
    <div class="p-4 bg-(--accent-subtle) w-12.5 h-12.5 rounded-md">
      <AlignStartHorizontal :size="18" />
    </div>
    <h4>My Frontend Projects</h4>
    <p class="text-sm text-(--secondary)">
      A list of frontend projects I'm building
    </p>
    <div
      class="flex justify-between items-center text-(--muted) font-mono text-xs"
    >
      <span class="flex gap-2 justify-center"
        ><Columns :size="14" /> 3 columns</span
      ><span class="flex gap-2 justify-center"
        ><Clock :size="14" /> 2hr ago</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AlignStartHorizontal, Clock, Columns } from "@lucide/vue";
</script>

<style></style>
