<template>
  <div>
    <GripVertical />
    <div>
      <Badge :class="`text-(${statusVariable}-text) bg-(${statusVariable}-bg)`"
        ><span :class="`bg-(${statusVariable}-dot)`"></span
        >{{ statusText }}</Badge
      >
      <p>{{ card.title }}</p>
      <p>{{ card.description }}</p>
    </div>
    <div>
      <p>{{ card.priority }}</p>
      <div>
        <p>{{ dueDate }}</p>
        <Badge>{{ avatar }}</Badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { statusColorVariableMap, statusTextMap } from "@/constants";
import type { Card } from "@/types";
import { GripVertical } from "@lucide/vue";
const { card } = defineProps<{ card: Card }>();
const statusVariable = statusColorVariableMap[card.status];
const statusText = statusTextMap[card.status];
const dueDate =
  card.dueDate &&
  new Date(card.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
const avatar = card.assignee
  ?.split(" ")
  .map((n) => n[0])
  .join("");
</script>

<style></style>
