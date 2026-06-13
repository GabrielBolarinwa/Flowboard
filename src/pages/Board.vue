<template>
  <BoardHeader :boardId="boardId as string" />
</template>

<script lang="ts" setup>
import BoardHeader from "@/components/board/BoardHeader.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const boardId = computed(() => route.params.boardId);
</script>

<style></style>
