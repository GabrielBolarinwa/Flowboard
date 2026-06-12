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
        v-model="searchInput"
      />
      <Search :size="15.5" class="absolute top-1/2 left-5.5 -translate-y-1/2" />
    </search>
    <section class="mt-10">
      <div class="flex justify-between item-center gap-4">
        <h3 class="text-(--muted) font-mono">Your Boards</h3>
        <AddBoard trigger="main_button" />
      </div>
      <article class="mt-4">
        <ul class="flex flex-wrap gap-6.5" v-if="getObjectLength(boards) > 0">
          <li
            class="w-[98.96%] md:w-[48%] lg:w-[31.96%] bg-(--surface) p-6 rounded-lg flex flex-col gap-4 hover:-translate-y-0.5 border border-(--border) hover:border-(--border-focus) relative group"
            v-for="board in boards"
          >
            <BoardCard :board="board" />
          </li>
        </ul>
        <NoBoards
          v-else-if="searchInput.length <= 0 && getObjectLength(boards) <= 0"
        />
        <NoSearch
          v-else-if="searchInput.length >= 1 && getObjectLength(boards) <= 0"
        />
      </article>
    </section>
    <Separator />
  </main>
</template>

<script lang="ts" setup>
import AddBoard from "@/components/AddBoard.vue";
import BoardCard from "@/components/BoardCard.vue";
import NoBoards from "@/components/NoBoards.vue";
import NoSearch from "@/components/NoSearch.vue";
import Input from "@/components/ui/input/Input.vue";
import Separator from "@/components/ui/separator/Separator.vue";
import { useBoardStore } from "@/stores/board";
import type { Board } from "@/types";
import getObjectLength from "@/utils/getObjectLength";
import { Search } from "@lucide/vue";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref, Transition } from "vue";

const searchInput = ref("");
const { boards: storeBoards } = storeToRefs(useBoardStore());
const boards = ref<Record<string, Board>>(storeBoards.value);
watch(searchInput, () => {
  if (searchInput.value.length >= 1) {
    boards.value = Object.fromEntries(
      Object.entries(storeBoards.value).filter(([_, value]) => {
        if (
          !value.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
          value.description
        ) {
          return value.description
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
        }
        return value.name
          .toLowerCase()
          .includes(searchInput.value.toLowerCase());
      }),
    );
  } else {
    boards.value = storeBoards.value;
  }
});
</script>

<style scoped>
.heading {
  --heading: clamp(2.25rem, 1.5rem + 1.5vw, 3.375rem);

  @apply text-(length:--heading);
}
</style>
