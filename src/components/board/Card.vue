<script lang="ts" setup>
import { statusColorVariableMap, statusTextMap } from "@/constants";
import type { Card } from "@/types";
import { Calendar, GripVertical } from "@lucide/vue";
import Badge from "../ui/badge/Badge.vue";
import { computed, ref } from "vue";
import { useSortable } from "@dnd-kit/vue/sortable";
import EditTitle from "./EditTitle.vue";
const editingTitle = ref(false);

const emit = defineEmits<{ open: [cardId: string] }>();
const props = defineProps<{
  card: Card;
  index: number;
  columnId: string;
}>();
const statusText = computed(() => statusTextMap[props.card.status]);
const dueDate =
  props.card.dueDate &&
  new Date(props.card.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
const dueDateMs = props.card.dueDate && new Date(props.card.dueDate);
const avatar = computed(() =>
  props.card.assignee
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2),
);
const statusVariablePrefix = computed(
  () => statusColorVariableMap[props.card.status],
);
const element = ref<HTMLElement | null>(null);
const handle = ref<HTMLElement | null>(null);

const { isDragging } = useSortable({
  id: props.card.id,
  index: computed(() => props.index),
  group: computed(() => props.columnId),
  element,
  handle,
  type: "card",
  accept: "card",
});
</script>
<template>
  <li
    class="flex bg-(--surface) border-(--border) rounded-lg shadow-card border p-4 flex-col hover:-translate-y-px hover:shadow-(--shadow-card-hover) cursor-pointer"
    :tabindex="0"
    @click="emit('open', props.card.id)"
    @keydown.enter="emit('open', props.card.id)"
    @keydown.space.prevent="emit('open', props.card.id)"
    :aria-label="`${props.card.title} ${props.card.status}, select for more details`"
    ref="element"
    :data-dragging="isDragging"
    :data-test="`card-${props.index}`"
  >
    <div class="flex gap-3">
      <div
        class="w-4 h-4 cursor-grab"
        ref="handle"
        data-test="card-drag-handle"
      >
        <GripVertical :size="16" aria-label="Drag Card" />
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
          @click.stop="editingTitle = true"
          data-test="cardTitle"
          v-if="!editingTitle"
        >
          {{ props.card.title }}
        </p>
        <EditTitle
          v-if="editingTitle"
          :cardId="props.card.id"
          @closeInput="editingTitle = false"
        />
        <p
          class="text-sm font-regular leading-relaxed text-(--secondary) mt-2"
          data-test="cardDesc"
        >
          {{ props.card.description }}
        </p>
      </div>
    </div>
    <div
      class="flex mt-2 justify-between font-mono text-xs text-(--muted) items-center"
    >
      <p>
        {{ `${props.card.priority?.toUpperCase()}` }}
      </p>
      <div class="flex gap-4 items-center">
        <p
          v-if="dueDate"
          :class="`flex gap-2 items-center ${Date.now() > Number(dueDateMs) ? 'text-destructive/80' : ''}`"
        >
          <Calendar aria-hidden :size="16" />{{ dueDate }}
        </p>
        <Badge
          v-if="avatar"
          class="bg-(--accent) rounded-full text-(--primary) w-5 h-5 aspect-[1] max-w-5 truncate uppercase"
          >{{ avatar }}</Badge
        >
      </div>
    </div>
  </li>
</template>

<style></style>
