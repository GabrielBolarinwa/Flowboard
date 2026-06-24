<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { columnSchema } from "@/schemas/column.ts";
import { ArrowRight, Plus } from "@lucide/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import Field from "../ui/field/Field.vue";
import FieldError from "../ui/field/FieldError.vue";
import FieldLabel from "../ui/field/FieldLabel.vue";
import { ref } from "vue";
import { useColumnStore } from "@/stores/column.ts";
const { boardId } = defineProps<{ boardId: string }>();
const { addColumn } = useColumnStore();
const columnFormSchema = toTypedSchema(columnSchema);

const isOpen = ref(false);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: columnFormSchema,
});
const [name, nameAttrs] = defineField("name");
const onSubmit = handleSubmit((values) => {
  addColumn(values, boardId);
  isOpen.value = false;
});
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        class="flex gap-2 bg-(--accent) hover:bg-(--accent-hover)"
        data-test="addColumnButton"
        ><Plus aria-hidden />
        <span class="sr-only md:not-sr-only">Add Column</span></Button
      >
    </PopoverTrigger>
    <PopoverContent
      class="w-80 m-0 px-0 bg-(--surface) border-(--border) border-2 radius-lg p-5"
      data-test="addColumnPopover"
    >
      <form @submit.prevent="onSubmit">
        <Field :data-invalid="!!errors.name" class="relative">
          <FieldLabel for="name">Enter Column Name:</FieldLabel>
          <div class="relative">
            <Input
              id="name"
              type="text"
              class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
              v-bind="nameAttrs"
              v-model="name"
              :aria-invalid="!!errors.name"
              data-test="columnNameInput"
              placeholder="e.g. House Tasks etc."
            />
            <Button
              class="absolute top-[50%] -translate-y-1/2 right-1 bg-(--surface) h-full px-3 py-2 w-auto border border-(--border)"
              type="submit"
              aria-label="Add Column"
              data-test="submitColumnForm"
              ><ArrowRight
            /></Button>
          </div>
          <FieldError>{{ errors.name }}</FieldError>
        </Field>
      </form>
    </PopoverContent>
  </Popover>
</template>
