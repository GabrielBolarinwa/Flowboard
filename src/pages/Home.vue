<template>
  <main class="p-6">
    <Transition
      enter-active-class="animate-in fade-in slide-in-from-top duration-3000 delay-500"
      appear
    >
      <div class="flex gap-5 items-center justify-center self-center">
        <img
          src="/flowboard.png"
          alt="Flowboard logo"
          width="512"
          height="512"
          class="h-20 w-20"
        />
        <h1 class="heading">Flowboard</h1>
      </div>
    </Transition>
    <search role="search" class="mt-4 w-[90%] mx-auto relative">
      <Input
        class="px-5 py-3 pl-7 h-auto rounded-md bg-(--surface-2) border-(--border) border focus:border-(--border-focus)"
        placeholder="Search for your boards"
      />
      <Search :size="15.5" class="absolute top-1/2 left-5.5 -translate-y-1/2" />
    </search>
    <section class="mt-10">
      <div class="flex justify-between item-center gap-4">
        <h3 class="text-(--muted) font-mono">Your Boards</h3>
        <button
          class="bg-(--accent) hover:bg-(--accent-hover) py-1.5 px-3 flex justify-center items-center gap-2 rounded-md"
        >
          <Plus /> New Board
        </button>
      </div>
      <article class="mt-4">
        <ul class="flex flex-wrap gap-6.5 hidden">
          <li
            class="w-[80%] md:w-[45%] lg:w-[31.96%] bg-(--surface) p-6 rounded-lg flex flex-col gap-4 hover:-translate-y-0.5 border border-(--border) hover:border-(--border-focus)"
          >
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
          </li>
        </ul>
        <div
          class="flex flex-col gap-6 mt-9 items-center justify-center hidden"
        >
          <div
            class="mx-auto bg-(--surface-2) border border-(--border) p-6 rounded-md"
          >
            <AlignStartHorizontal :size="32" />
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
        <div
          class="flex flex-col gap-6 mt-9 items-center justify-center hidden"
        >
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
      </article>
    </section>
  </main>
</template>

<script lang="ts" setup>
import Input from "@/components/ui/input/Input.vue";
import {
  AlignStartHorizontal,
  Clock,
  Columns,
  Plus,
  Search,
  SearchX,
} from "@lucide/vue";
import { Transition } from "vue";
</script>

<style scoped>
.heading {
  --heading: clamp(2.25rem, 1.5rem + 1.5vw, 3.375rem);

  @apply text-(length:--heading);
}
</style>
