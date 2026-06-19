<template>
  <Button
    v-if="!inputActive"
    class="p-3 border-(--border) border-dashed border rounded-md justify-start text-sm! font-medium py-2 px-3 items-center gap-2 w-full hover:border-(--border-focus) text-(--secondary) transition-[0.15s]"
    @click="inputActive = true"
  >
    <Plus /> Add Card
  </Button>
  <form v-else class="flex gap-2" @submit.prevent="submitForm">
    <Label for="cardTitle" class="sr-only">Enter Card Name:</Label>
    <Input
      id="cardTitle"
      type="text"
      placeholder="e.g. Fix functionality on client project"
      class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
      v-model="cardTitle"
      :value="cardTitle"
    />
    <Button
      class="bg-(--surface) h-full px-3 py-2 w-auto border border-(--border)"
      :type="cardTitle.length > 0 ? `submit` : `button`"
      @click="cardTitle.length <= 0 ? (inputActive = false) : inputActive"
      ><ArrowRight v-if="cardTitle.length > 0" /> <X v-else />
    </Button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import { ArrowRight, Plus, X } from "@lucide/vue";
import type { CardFormValue } from "@/types/index.ts";
import { useCardStore } from "@/stores/card.ts";
import Label from "../ui/label/Label.vue";

const inputActive = ref(false);
const cardTitle = ref("");
const { addCard } = useCardStore();
const { columnId, boardId } = defineProps<{
  columnId: string;
  boardId: string;
}>();

function submitForm() {
  if (cardTitle.value.length <= 0) {
    inputActive.value = false;
    return;
  }
  const card: CardFormValue = {
    title: cardTitle.value,
    status: "todo",
    priority: "medium",
  };
  addCard(card, columnId, boardId);
  cardTitle.value = "";
}
</script>

<style></style>
