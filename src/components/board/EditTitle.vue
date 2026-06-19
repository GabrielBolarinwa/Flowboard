<template>
  <form
    class="flex gap-2 relative bg-(--surface-2) border-(--border) border p-1 h-min pl-3 mt-2 rounded-md"
    @submit.prevent="onSubmit"
    @click.stop
  >
    <Label for="cardTitle" class="sr-only">Enter Card Name:</Label>

    <Input
      id="cardTitle"
      type="text"
      placeholder="e.g. Fix functionality on client project"
      class="text-sm p-0 leading-snug bg-transparent border-none! focus:border-none! focus:outline-none! focus-visible:shadow-(--shadow-none)"
      v-model="cardTitle"
      :value="cardTitle"
      @keydown.esc="emits('closeInput')"
      @keydown.enter="onSubmit"
      @blur="onSubmit"
    />
  </form>
</template>

<script lang="ts" setup>
import { useCardStore } from "@/stores/card.ts";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Input from "../ui/input/Input.vue";
import Label from "../ui/label/Label.vue";
const { cardId } = defineProps<{ cardId: string }>();
const { cards } = storeToRefs(useCardStore());
const { titleCardEdit } = useCardStore();

const cardTitle = ref(cards.value[cardId].title);

const emits = defineEmits(["closeInput"]);
function onSubmit() {
  if (cardTitle.value.length <= 0) {
    emits("closeInput");
    return;
  }
  titleCardEdit(cardId, cardTitle.value);
  emits("closeInput");
}
</script>

<style></style>
