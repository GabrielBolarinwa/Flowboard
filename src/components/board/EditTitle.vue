<template>
  <form
    class="flex gap-2 relative bg-(--surface-2) border-(--border) border p-1 h-min pl-3 mt-2 rounded-md"
    @submit.prevent="onSubmit"
  >
    <Label for="cardTitle" class="sr-only">Enter Card Name:</Label>

    <Input
      id="cardTitle"
      type="text"
      placeholder="e.g. Fix functionality on client project"
      class="text-sm p-0 leading-snug bg-transparent border-none! focus:border-none! focus:outline-none! focus-visible:shadow-(--shadow-none)"
      v-model="cardTitle"
      :value="cardTitle"
    />
    <Button
      class="bg-(--surface) px-3 py-1 w-auto border border-(--border)"
      :type="cardTitle.length > 0 ? `submit` : `button`"
      @click="cardTitle.length <= 0 && emits('closeInput')"
      ><ArrowRight v-if="cardTitle.length > 0" /> <X v-else />
    </Button>
  </form>
</template>

<script lang="ts" setup>
import { useCardStore } from "@/stores/card.ts";
import { ArrowRight, X } from "@lucide/vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import Button from "../ui/button/Button.vue";
import Input from "../ui/input/Input.vue";
import Label from "../ui/label/Label.vue";
const { cardId } = defineProps<{ cardId: string }>();
const { cards } = storeToRefs(useCardStore());
const { titleCardEdit } = useCardStore();

const cardTitle = ref(cards.value[cardId].title);

const emits = defineEmits(["closeInput"]);
function onSubmit() {
  titleCardEdit(cardId, cardTitle.value);
  emits("closeInput");
}
</script>

<style></style>
