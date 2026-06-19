<template>
  <div class="flex gap-3">
    <div class="w-4 h-4 cursor-grab">
      <GripVertical :size="16" />
    </div>
    <div class="-mt-2">
      <Badge
        :style="{
          color: `var(${statusVariablePrefix}-text)`,
          borderColor: `var(${statusVariablePrefix}-border)`,
          background: `var(${statusVariablePrefix}-bg)`,
        }"
        ><span
          class="w-1.5 h-1.5 rounded-full"
          :style="{ background: `var(${statusVariablePrefix}-dot)` }"
        ></span
        >{{ statusText }}</Badge
      >
      <p
        class="font-semibold text-sm leading-snug mt-2 cursor-text select-none"
        @click="editingTitle = true"
        v-if="!editingTitle"
      >
        {{ card.title }}
      </p>
      <EditTitle
        v-if="editingTitle"
        :cardId="card.id"
        @closeInput="editingTitle = false"
      />
      <p class="text-sm font-regular leading-relaxed text-(--secondary) mt-2">
        {{ card.description }}
      </p>
    </div>
  </div>
  <div
    class="flex mt-2 justify-between font-mono text-xs text-(--muted) items-center"
  >
    <p>
      {{ `${card.priority?.toUpperCase()}` }}
    </p>
    <div class="flex gap-4 items-center">
      <p
        v-if="dueDate"
        :class="`flex gap-2 items-center ${Date.now() > Number(card.dueDate) && 'text-destructive/80'}`"
      >
        <Calendar :size="16" />{{ dueDate }}
      </p>
      <Badge
        v-if="avatar"
        class="bg-(--accent) rounded-full text-(--primary) w-5 h-5 aspect-[1] max-w-5 truncate uppercase"
        >{{ avatar }}</Badge
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { statusColorVariableMap, statusTextMap } from "@/constants";
import type { Card } from "@/types";
import { Calendar, GripVertical } from "@lucide/vue";
import Badge from "../ui/badge/Badge.vue";
import { computed, ref } from "vue";
import EditTitle from "./EditTitle.vue";
const editingTitle = ref(false);

const { card } = defineProps<{ card: Card }>();
const statusText = statusTextMap[card.status];
const dueDate =
  card.dueDate &&
  new Date(card.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
const avatar = computed(() =>
  card.assignee
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2),
);
const statusVariablePrefix = statusColorVariableMap[card.status];
</script>

<style></style>
