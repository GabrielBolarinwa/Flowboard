<template>
  <li
    :class="`bg-(--surface-2) rounded-lg p-4 flex w-78 flex-col min-h-[96px] gap-4 h-fit border ${column.wipLimit && column.cardIds.length > column.wipLimit ? `border-destructive/30` : `border-(--border)`}`"
    ref="element"
    data-test="column"
  >
    <div class="flex justify-between items-center text-xs gap-1">
      <h4
        class="font-bold uppercase text-(--secondary) truncate tracking-widest cursor-grab select-none"
        ref="handle"
        :tabindex="0"
      >
        <GripVertical aria-hidden class="mr-1 inline" :size="14" />
        {{ column.name }}
      </h4>
      <div class="text-(--muted) flex gap-1.5 items-center min-w-1/2 w-max">
        <Badge
          variant="secondary"
          class="bg-(--border) py-0! px-2! font-mono h-fit"
          :aria-label="`Card is ${cardCount}`"
          data-test="cardCount"
          ><span>{{ cardCount }}</span></Badge
        >
        <Button
          @click="createDialogOpen"
          class="w-auto h-auto rounded-full p-1.5! hover:bg-(--surface)"
          aria-label="Add Card"
          data-test="addCardButton"
        >
          <Plus />
        </Button>
        <EditColumnPopover :columnId="column.id" />
        <DeleteColumnDialog :columnId="column.id" />
      </div>
    </div>
    <ScrollArea class="h-[57.5dvh]">
      <ul class="flex flex-col gap-2 min-h-[57.5dvh]">
        <Card
          v-for="(card, index) in cards"
          :card="card"
          :key="card.id"
          :index="index"
          :columnId="column.id"
          @open="editDialogOpen"
        />
        <NoCards v-if="cards.length === 0" />
      </ul>
    </ScrollArea>
    <QuickAddCard :columnId="column.id" :boardId="boardId" />
  </li>

  <Dialog modal :open="open" @update:open="onDialogOpenChange">
    <CardDetail
      v-if="open"
      :open="open"
      :mode="dialogMode"
      :columnId="column.id"
      :boardId="boardId"
      :cardId="activeCardId"
      @close="open = false"
    />
  </Dialog>
</template>

<script lang="ts" setup>
import { useCardStore } from "@/stores/card";
import { type Column } from "@/types";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useSortable } from "@dnd-kit/vue/sortable";
import { GripVertical, Plus } from "@lucide/vue";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import Badge from "../ui/badge/Badge.vue";
import Button from "../ui/button/Button.vue";
import Dialog from "../ui/dialog/Dialog.vue";
import ScrollArea from "../ui/scroll-area/ScrollArea.vue";
import Card from "./Card.vue";
import CardDetail from "./CardDetail.vue";
import DeleteColumnDialog from "./DeleteColumnDialog.vue";
import EditColumnPopover from "./EditColumnPopover.vue";
import NoCards from "./NoCards.vue";
import QuickAddCard from "./QuickAddCard.vue";
const { column, boardId, index } = defineProps<{
  column: Column;
  boardId: string;
  index: number;
}>();
const { cards: storeCards } = storeToRefs(useCardStore());
const cards = computed(() => column.cardIds.map((id) => storeCards.value[id]));
const cardCount = computed(() => column.cardIds.length ?? 0);

const element = ref<HTMLElement | null>(null);
const handle = ref<HTMLElement | null>(null);

const open = ref(false);
const dialogMode = ref<"create" | "edit">("create");
const activeCardId = ref<string | undefined>(undefined);

useSortable({
  id: column.id,
  index,
  accept: ["column", "card"],
  type: "column",
  collisionPriority: CollisionPriority.Low,
  element,
  handle,
});

function createDialogOpen() {
  dialogMode.value = "create";
  open.value = true;
}

function editDialogOpen(cardId: string) {
  dialogMode.value = "edit";
  activeCardId.value = cardId;
  open.value = true;
}

function onDialogOpenChange(currentOpen: boolean) {
  open.value = currentOpen;
  if (!currentOpen) {
    activeCardId.value = undefined;
  }
}
</script>

<style></style>
