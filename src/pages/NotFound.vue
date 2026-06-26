<template>
  <main
    class="h-dvh flex items-center justify-center flex-col gap-4"
    data-test="notFoundMain"
  >
    <p class="flex gap-2 justify-center text-3xl font-bold items-center">
      <img src="/flowboard.png" alt="Flowboard Logo" class="h-12.5 w-12.5" />
      Flowboard
    </p>
    <h1
      class="text-9xl text-shadow-(color:--accent) text-shadow-lg leading-none neon-orange"
    >
      404
    </h1>
    <p class="text-(--muted)">
      The board you're looking for doesn't exist or may have been deleted
    </p>
    <div class="mb-12 flex justify-center">
      <div
        class="relative w-48 h-48 bg-(--surface) rounded-lg border border-(--border) flex items-center justify-center overflow-hidden"
      >
        <p class="text-8xl opacity-30">📋</p>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <CircleAlert
              class="text-[#00000030] fill-(--accent)/30"
              :size="60"
            />
          </div>
        </div>
      </div>
    </div>
    <Button class="py-3 w-80 bg-(--accent) flex gap-3">
      <ArrowLeft /><RouterLink to="/">Back to dashboard</RouterLink>
    </Button>
  </main>
</template>

<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
import { ArrowLeft, CircleAlert } from "@lucide/vue";
import { RouterLink } from "vue-router";
</script>

<style>
.neon-orange {
  text-shadow:
    0 0 10px var(--accent),
    0 0 20px var(--accent);
}
</style>
