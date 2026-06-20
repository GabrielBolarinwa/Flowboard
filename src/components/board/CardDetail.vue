<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, toRefs } from "vue";

import { Button } from "@/components/ui/button";
import {
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
import Select from "@/components/ui/select/Select.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectGroup from "@/components/ui/select/SelectGroup.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import SelectLabel from "@/components/ui/select/SelectLabel.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import { cardSchema } from "@/schemas/card.ts";
import { useCardStore } from "@/stores/card.ts";
import { Save } from "@lucide/vue";
import { storeToRefs } from "pinia";
import CardDeleteDialog from "./CardDeleteDialog.vue";
import ScrollArea from "../ui/scroll-area/ScrollArea.vue";
import timeAgo from "@/utils/timeAgo.ts";

const cardFormSchema = toTypedSchema(cardSchema);

const props = defineProps<{
  mode: "create" | "edit";
  columnId: string;
  cardId?: string;
  boardId: string;
}>();
const { mode, cardId, columnId, boardId } = toRefs(props);
const emit = defineEmits<{ close: [] }>();
const { addCard, editCard } = useCardStore();
const { cards } = storeToRefs(useCardStore());
const card = computed(() =>
  mode.value === "edit" && cardId.value ? cards.value[cardId.value] : null,
);
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: cardFormSchema,
  initialValues: card.value
    ? {
        title: card.value.title,
        description: card.value.description,
        assignee: card.value.assignee,
        dueDate: card.value.dueDate
          ? new Date(card.value.dueDate).toISOString().split("T")[0]
          : undefined,
        status: card.value.status,
        priority: card.value.priority,
      }
    : { status: "todo", priority: "medium" },
});
const [title, titleAttrs] = defineField("title");
const [description, descriptionAttrs] = defineField("description");
const [assignee, assigneeAttrs] = defineField("assignee");
const [dueDate, dueDateAttrs] = defineField("dueDate");
const [status, statusAttrs] = defineField("status");
const [priority, priorityAttrs] = defineField("priority");
const onSubmit = handleSubmit((values) => {
  if (mode.value === "create") {
    addCard(values, columnId.value, boardId.value);
  }
  if (mode.value === "edit" && card.value) {
    editCard(card.value.id, values);
  }
  emit("close");
});

const today = new Date().toISOString().split("T")[0];
</script>

<template>
  <DialogContent
    class="max-w-130 m-0 px-0 bg-(--surface) border-(--border) border-2 rounded-lg p-5 max-h-[90dvh] overflow-y-auto"
  >
    <DialogHeader class="">
      <DialogTitle class="font-bold"
        ><span v-if="mode === 'create'">Add Card</span
        ><span v-if="mode === 'edit'">Card Details</span></DialogTitle
      >
      <DialogDescription class="text-(--muted) mt-2">
        <span v-if="mode === 'create'"
          >Give your card a title and an optional description</span
        >
        <span v-else-if="mode === 'edit'">View and change card details</span>
      </DialogDescription>
    </DialogHeader>

    <form id="cardForm" @submit.prevent="onSubmit" class="mt-4">
      <FieldGroup class="gap-4">
        <Field :data-invalid="!!errors.title">
          <FieldLabel
            class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
            for="cardTitle"
          >
            Title
          </FieldLabel>
          <Input
            id="cardTitle"
            type="text"
            placeholder="e.g. Fix functionality on client project"
            class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
            v-bind="titleAttrs"
            v-model="title"
            :aria-invalid="!!errors.title"
          />
          <FieldError>{{ errors.title }}</FieldError>
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
            placeholder="What is this card for? (optional)"
            v-bind="descriptionAttrs"
            v-model="description"
            :aria-invalid="!!errors.description"
          />
          <FieldError>{{ errors.description }}</FieldError>
        </Field>
        <Field :data-invalid="!!errors.status">
          <FieldLabel
            class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
            for="status"
          >
            Status
          </FieldLabel>
          <Select
            v-model:modelValue="status"
            v-bind="statusAttrs"
            :aria-invalid="!!errors.status"
          >
            <SelectTrigger class="border-(--border)" id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-(--surface-2) border-(--border)">
              <SelectGroup>
                <SelectLabel class="text-xs font-mono text-(--muted)"
                  >Status</SelectLabel
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="todo"
                  >Todo</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="in-progress"
                  >In Progress</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="in-review"
                  >In Review</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="blocked"
                  >Blocked</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="done"
                  >Done</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="cancelled"
                  >Cancelled</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError>{{ errors.status }}</FieldError>
        </Field>
        <Field :data-invalid="errors.priority">
          <FieldLabel
            for="priority"
            class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
            >Priority</FieldLabel
          >
          <Select
            v-model:modelValue="priority"
            v-bind="priorityAttrs"
            :aria-invalid="!!errors.priority"
          >
            <SelectTrigger class="border-(--border)" id="priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-(--surface-2) border-(--border)">
              <SelectGroup>
                <SelectLabel class="text-xs font-mono text-(--muted)"
                  >Priority</SelectLabel
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="low"
                  >Low</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="medium"
                  >Medium</SelectItem
                >
                <SelectItem
                  class="focus:border-(--border) hover:border-(--border) text-base"
                  value="high"
                  >High</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError>{{ errors.priority }}</FieldError>
        </Field>
        <Field :data-invalid="!!errors.dueDate">
          <FieldLabel
            for="dueDate"
            class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
            >Due Date</FieldLabel
          >
          <Input
            id="dueDate"
            type="date"
            class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
            :min="today"
            v-bind="dueDateAttrs"
            v-model="dueDate"
            :aria-invalid="!!errors.dueDate"
          />
          <FieldError>{{ errors.dueDate }}</FieldError>
        </Field>
        <Field :data-invalid="!!errors.assignee">
          <FieldLabel
            class="font-mono text-(--secondary) tracking-wide uppercase mb-1"
            for="assignee"
            >Assignee</FieldLabel
          >
          <Input
            id="assignee"
            type="text"
            v-bind="assigneeAttrs"
            v-model="assignee"
            placeholder="e.g. Project Manager"
            :aria-invalid="!!errors.assignee"
            class="bg-(--surface-2) border-(--border) border p-2 h-auto pl-3"
          />
          <FieldError>{{ errors.assignee }}</FieldError>
        </Field>
      </FieldGroup>
    </form>
    <div v-if="mode === 'edit'">
      <p
        class="uppercase font-mono tracking-wide text-sm font-medium text-(--secondary) mb-3"
      >
        Activity Log
      </p>
      <ul
        class="bg-(--bg) border-(--border) py-3 px-4 font-mono text-sm rounded-lg"
      >
        <ScrollArea class="h-[20vh]">
          <li v-for="activity in card?.activity" :key="activity.timestamp">
            {{ activity.message }}, {{ timeAgo(activity.timestamp) }}
          </li>
        </ScrollArea>
      </ul>
    </div>
    <hr class="border-(--border)" />
    <DialogFooter class="py-3 px-5 gap-3">
      <DialogClose as-child v-if="mode === 'create'">
        <Button
          type="button"
          variant="secondary"
          class="border border-(--border)"
        >
          Cancel
        </Button>
      </DialogClose>
      <CardDeleteDialog
        :cardId="cardId"
        v-if="mode === 'edit'"
        @close="emit('close')"
      />
      <Button
        type="submit"
        class="bg-(--accent) hover:bg-(--accent-hover) py-2! px-3! h-auto w-auto flex justify-center items-center gap-2 rounded-md"
        form="cardForm"
        ><span v-if="mode === 'create'">Create Card</span
        ><span v-else-if="mode === 'edit'" class="flex gap-2 items-center"
          ><Save /> Save
        </span></Button
      >
    </DialogFooter>
  </DialogContent>
</template>
