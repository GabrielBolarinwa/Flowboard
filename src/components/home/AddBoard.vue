<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { boardSchema } from "@/schemas/board.ts";
import { useBoardStore } from "@/stores/board.ts";
import { Plus } from "@lucide/vue";
import Textarea from "../ui/textarea/Textarea.vue";
import { router } from "@/router.ts";

const isOpen = ref(false);
const boardFormSchema = toTypedSchema(boardSchema);

defineProps<{ trigger: string }>();
const { addBoard } = useBoardStore();
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: boardFormSchema,
});
const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");
const onSubmit = handleSubmit((values) => {
  const boardId = addBoard(values);
  isOpen.value = false;
  setTimeout(() => {
    router.push(`/board/${boardId}`);
  }, 1000);
});
</script>

<template>
  <Button
    @click="isOpen = true"
    v-if="trigger === 'main_button'"
    class="bg-(--accent) hover:bg-(--accent-hover) py-2! px-3! h-auto w-auto flex justify-center items-center gap-2 rounded-md"
  >
    <Plus aria-hidden /> New Board
  </Button>
  <Button
    @click="isOpen = true"
    v-if="trigger === 'secondary_button'"
    variant="outline"
    class="bg-(--accent-subtle) border border-(--border) hover:border-(--border-focus) py-1.5 px-3 flex justify-center items-center gap-2 rounded-md"
  >
    <Plus aria-hidden /> New Board
  </Button>
  <Dialog modal :open="isOpen" @update:open="isOpen = $event">
    <DialogContent
      class="max-w-130 m-0 px-0 bg-(--surface) border-(--border) border-2 radius-lg p-5"
    >
      <DialogHeader class="">
        <DialogTitle class="bold">Add Board</DialogTitle>
        <DialogDescription class="text-(--muted) mt-2">
          Give your board a name and an optional description
        </DialogDescription>
      </DialogHeader>

      <form id="addBoardForm" @submit.prevent="onSubmit" class="mt-4">
        <FieldGroup class="gap-4">
          <Field :data-invalid="!!errors.name">
            <FieldLabel
              class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
              for="boardName"
            >
              Name
            </FieldLabel>
            <Input
              id="boardName"
              type="text"
              placeholder="e.g. My projects"
              class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
              v-bind="nameAttrs"
              v-model="name"
              :aria-invalid="!!errors.name"
            />
            <FieldError>{{ errors.name }}</FieldError>
          </Field>
          <Field :data-invalid="!!errors.description">
            <FieldLabel
              class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
              for="description"
            >
              Description
            </FieldLabel>
            <Textarea
              id="description"
              class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3 rounded-md min-h-20 max-h-50 mx-auto"
              placeholder="What is this board for? (optional)"
              v-bind="descriptionAttrs"
              v-model="description"
              :aria-invalid="!!errors.description"
            />
            <FieldError>{{ errors.description }}</FieldError>
          </Field>
        </FieldGroup>
      </form>
      <hr class="border-(--border)" />
      <DialogFooter class="py-3 px-5 gap-3">
        <DialogClose as-child>
          <Button
            type="button"
            variant="secondary"
            class="border border-(--border)"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          class="bg-(--accent) hover:bg-(--accent-hover) py-2! px-3! h-auto w-auto flex justify-center items-center gap-2 rounded-md"
          form="addBoardForm"
          >Create Board</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
