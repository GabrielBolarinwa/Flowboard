<template>
  <BoardHeader :boardId="boardId" />
  <main data-test="boardMain">
    <div class="px-5 lg:px-8 py-6">
      <ul
        v-if="columns.length > 0"
        class="flex gap-5 overflow-x-auto w-auto"
        data-test="columnList"
      >
        <DragDropProvider @dragOver="onDragOver" @dragEnd="onDragEnd">
          <Column
            v-for="(column, index) in columns"
            :column="column"
            :boardId="boardId"
            :index="index"
            :key="column.id"
          />
        </DragDropProvider>
      </ul>
    </div>
  </main>
  <div
    role="status"
    aria-live="polite"
    data-test="arialiveRegion"
    class="sr-only"
  >
    {{ announcement }}
  </div>
</template>

<script lang="ts" setup>
import BoardHeader from "@/components/board/BoardHeader.vue";
import Column from "@/components/board/Column.vue";
import { useBoardStore } from "@/stores/board";
import { useColumnStore } from "@/stores/column";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  DragDropProvider,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/vue";
import { isSortable } from "@dnd-kit/dom/sortable";
import { move } from "@dnd-kit/helpers";
import { useCardStore } from "@/stores/card";

const route = useRoute();
const boardId = route.params.boardId as string;

const { boards } = storeToRefs(useBoardStore());
const { columns: storeColumns } = storeToRefs(useColumnStore());
const { moveColumn } = useColumnStore();
const { cards } = storeToRefs(useCardStore());
const { moveCard } = useCardStore();

const board = computed(() => boards.value[boardId]);
const columns = computed(() =>
  board.value.columnIds.map((id) => storeColumns.value[id]),
);
const announcement = ref("");

function onDragOver(evt: DragOverEvent) {
  const { source } = evt.operation;
  if (source?.type === "column") return;
  if (!isSortable(source) || source.type !== "card") {
    return;
  }
  const grouped: Record<string, string[]> = {};
  for (const col of columns.value) {
    grouped[col.id] = [...col.cardIds];
  }
  const moved = move(grouped, evt as unknown as Parameters<typeof move>[1]);
  for (const colId in moved) {
    storeColumns.value[colId].cardIds = moved[colId];
  }
}

function onDragEnd(evt: DragEndEvent) {
  if (evt.canceled) return;
  const { source } = evt.operation;
  if (isSortable(source) && source?.type === "column") {
    const columnId = source?.id as string;
    const finalIndex = source?.index as number;
    moveColumn(columnId, boardId, finalIndex);
    announcement.value = `Column moved to position ${source.index + 1}`;
    return;
  }
  if (!isSortable(source) || source.type !== "card") return;
  const cardId = source?.id as string;
  const card = cards.value[cardId];
  if (!card) return;
  const finalColumnId = source?.group as string;
  if (card.columnId === finalColumnId) return;
  moveCard(cardId, finalColumnId);
  const toColumn = storeColumns.value[finalColumnId];
  announcement.value = `Card moved to ${toColumn.name}`;
}

onMounted(() => {
  document.title = `${board.value.name} Board — Flowboard`;
});
</script>

<style></style>
