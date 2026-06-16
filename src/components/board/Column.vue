<template>
  <div class="flex justify-between items-center text-xs gap-1">
    <h4 class="font-bold uppercase text-(--secondary) truncate tracking-widest">
      {{ column.name }}
    </h4>
    <div class="text-(--muted) flex gap-1.5 items-center min-w-1/2 w-max">
      <Badge class="bg-(--border) py-0! px-2! font-mono h-fit">{{
        cardCount
      }}</Badge>
      <Button class="w-auto h-auto rounded-full p-1.5! hover:bg-(--surface)"
        ><Plus
      /></Button>
      <EditColumnPopover :boardId="boardId" :columnId="column.id" />
      <Button class="w-auto h-auto rounded-full p-1.5! hover:bg-(--surface)"
        ><Trash2
      /></Button>
    </div>
  </div>
  <ul class="mt-4" v-if="cards.length > 0">
    <li v-for="card in cards">
      {{ card.title }}
    </li>
  </ul>
  <NoCards v-else-if="cards.length === 0" />
  <Button
    class="p-3 border-(--border) border-dashed border rounded-md justify-start text-sm! font-medium text-(--muted) py-2 px-3 items-center gap-2 w-full hover:border-(--border-focus) text-(--secondary) transition-[0.15s]"
  >
    <Plus /> Add Card
  </Button>
</template>

<script lang="ts" setup>
import { useCardStore } from "@/stores/card";
import { type Column } from "@/types";
import { Plus, Trash2 } from "@lucide/vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "../ui/badge/Badge.vue";
import Button from "../ui/button/Button.vue";
import EditColumnPopover from "./EditColumnPopover.vue";
import NoCards from "./NoCards.vue";
const { column, boardId } = defineProps<{ column: Column; boardId: string }>();
const { cards: storeCards } = storeToRefs(useCardStore());
const { getCardCount } = useCardStore();
const cards = column.cardIds.map((id) => storeCards.value[id]);
const cardCount = computed(() => getCardCount(boardId));
</script>

<style></style>
