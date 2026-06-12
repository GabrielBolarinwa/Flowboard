<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import DialogClose from "./ui/dialog/DialogClose.vue";
import Textarea from "./ui/textarea/Textarea.vue";

const boardFormSchema = toTypedSchema(boardSchema);

const { editBoard, getBoard } = useBoardStore();
const emit = defineEmits(["update:open"]);
const { open, boardId } = defineProps<{
  open: boolean;
  boardId: string;
}>();
const board = getBoard(boardId);
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: boardFormSchema,
  initialValues: {
    name: board.name,
    description: board.description,
  },
});
const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");

const onSubmit = handleSubmit((values) => {
  editBoard(boardId, values);
  emit("update:open", false);
});
</script>

<template>
  <Dialog modal :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent
      class="max-w-130 m-0 px-0 bg-(--surface) border-(--border) border-2 radius-lg p-5"
    >
      <DialogHeader>
        <DialogTitle class="bold">Edit Board</DialogTitle>
        <DialogDescription class="text-(--muted) mt-2">
          Edit Board name and description
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
          >Save Changes</Button
        >
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
