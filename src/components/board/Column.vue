<template>
  <div class="flex justify-between items-center text-xs gap-1">
    <h4 class="font-bold uppercase text-(--secondary) truncate tracking-widest">
      {{ column.name }}
    </h4>
    <div class="text-(--muted) flex gap-1.5 items-center min-w-1/2 w-max">
      <Badge
        variant="secondary"
        class="bg-(--border) py-0! px-2! font-mono h-fit"
        >{{ cardCount }}</Badge
      >
      <Button
        @click="isOpen = true"
        class="w-auto h-auto rounded-full p-1.5! hover:bg-(--surface)"
      >
        <Plus />
      </Button>
      <CardDetail
        mode="create"
        :columnId="column.id"
        :boardId="boardId"
        :open="isOpen"
      />
      <EditColumnPopover :columnId="column.id" />
      <DeleteColumnDialog :columnId="column.id" />
    </div>
  </div>
  <ScrollArea class="h-[57.5dvh]" v-if="cards.length > 0">
    <ul class="flex flex-col gap-2">
      <li
        v-for="card in cards"
        class="flex bg-(--surface) border-(--border) rounded-lg shadow-card border p-4 flex-col"
      >
        <Card :card="card" />
      </li>
    </ul>
  </ScrollArea>
  <NoCards v-else-if="cards.length === 0" />
  <QuickAddCard :columnId="column.id" :boardId="boardId" />
</template>

<script lang="ts" setup>
import { useCardStore } from "@/stores/card";
import { type Column } from "@/types";
import { Plus } from "@lucide/vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Badge from "../ui/badge/Badge.vue";
import Button from "../ui/button/Button.vue";
import DeleteColumnDialog from "./DeleteColumnDialog.vue";
import EditColumnPopover from "./EditColumnPopover.vue";
import NoCards from "./NoCards.vue";
import CardDetail from "../CardDetail.vue";
import { ref } from "vue";
import QuickAddCard from "./QuickAddCard.vue";
import Card from "./Card.vue";
import ScrollArea from "../ui/scroll-area/ScrollArea.vue";
const { column, boardId } = defineProps<{ column: Column; boardId: string }>();
const { cards: storeCards } = storeToRefs(useCardStore());
const cards = computed(() => column.cardIds.map((id) => storeCards.value[id]));
const cardCount = computed(() => column.cardIds.length ?? 0);
const isOpen = ref(false);
</script>

<style></style>
