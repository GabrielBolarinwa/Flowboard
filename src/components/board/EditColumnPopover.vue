<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { columnSchema } from "@/schemas/column.ts";
import { useColumnStore } from "@/stores/column.ts";
import { Edit3 } from "@lucide/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { ref, type Ref } from "vue";
import Field from "../ui/field/Field.vue";
import FieldError from "../ui/field/FieldError.vue";
import FieldLabel from "../ui/field/FieldLabel.vue";
import Checkbox from "../ui/checkbox/Checkbox.vue";
const { columnId } = defineProps<{ columnId: string }>();
const { editColumn, getColumn } = useColumnStore();
const column = getColumn(columnId);
const columnFormSchema = toTypedSchema(columnSchema);

const isOpen = ref(false);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: columnFormSchema,
  initialValues: {
    name: column.name,
    wipLimit: column.wipLimit || 10,
  },
});
const [name, nameAttrs] = defineField("name");
const [wipLimit, wipLimitAttrs] = defineField("wipLimit");
const wipLimitField = wipLimit as Ref<number>;
const wipEnabled = ref(column.wipLimit ? true : false);
const onSubmit = handleSubmit((values) => {
  const editedColumn = {
    name: values.name,
    wipLimit:
      values.wipLimit === "" || !wipEnabled.value ? null : values.wipLimit,
  };
  editColumn(columnId, editedColumn);
  isOpen.value = false;
});
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        class="w-auto h-auto rounded-full p-1.5! hover:bg-(--surface)"
        aria-label="Edit Column"
        ><Edit3
      /></Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-80 m-0 px-0 bg-(--surface) border-(--border) border-2 radius-lg p-5"
    >
      <form @submit.prevent="onSubmit">
        <Field :data-invalid="!!errors.name">
          <FieldLabel for="name">Enter Column Name:</FieldLabel>
          <Input
            id="name"
            type="text"
            class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
            v-bind="nameAttrs"
            v-model="name"
            :aria-invalid="!!errors.name"
            placeholder="e.g. House Tasks etc."
          />
          <FieldError>{{ errors.name }}</FieldError>
        </Field>
        <Field class="gap-2 flex-row mb-4 mt-2 items-center justify-center">
          <Checkbox
            v-model="wipEnabled"
            class="w-5! h-5! aspect-[1] rounded-full border-(--border) bg-(--surface-2)"
            id="wipEnabled"
          />
          <FieldLabel for="wipEnabled">Enable WIP Limit</FieldLabel>
        </Field>
        <Field :data-invalid="!!errors.wipLimit">
          <FieldLabel for="wipLimit">Set a WIP Limit:</FieldLabel>
          <Input
            id="wipLimit"
            type="number"
            class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
            v-bind="wipLimitAttrs"
            :disabled="!wipEnabled"
            v-model="wipLimitField"
            :aria-invalid="!!errors.wipLimit"
          />
          <FieldError>{{ errors.wipLimit }}</FieldError>
        </Field>
        <div class="flex justify-end gap-2 mt-4">
          <Button variant="outline" class="border-(--border)">Cancel</Button
          ><Button
            type="submit"
            class="bg-(--accent) hover:bg-(--accent-hover) py-2! px-3! h-auto w-auto flex justify-center items-center gap-2 rounded-md"
            >Save Changes</Button
          >
        </div>
      </form>
    </PopoverContent>
  </Popover>
</template>
