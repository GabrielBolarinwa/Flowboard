<template>
  <BoardHeader :boardId="boardId" />
  <main>
    <div class="px-8 py-6">
      <ul v-if="columns.length > 0" class="flex gap-5">
        <li
          v-for="column in columns"
          :class="`bg-(--surface-2) rounded-lg p-4 flex w-78 flex-col min-h-[96px] gap-4 h-fit border ${column.wipLimit && column.cardIds.length > column.wipLimit ? `border-destructive/30` : `border-(--border)`}`"
        >
          <Column :column="column" :boardId="boardId" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts" setup>
import BoardHeader from "@/components/board/BoardHeader.vue";
import Column from "@/components/board/Column.vue";
import { useBoardStore } from "@/stores/board";
import { useColumnStore } from "@/stores/column";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const boardId = route.params.boardId as string;
const { boards } = storeToRefs(useBoardStore());
const board = computed(() => boards.value[boardId]);
const { columns: storeColumns } = storeToRefs(useColumnStore());
const columns = computed(() =>
  board.value.columnIds.map((id) => storeColumns.value[id]),
);
</script>

<style></style>
