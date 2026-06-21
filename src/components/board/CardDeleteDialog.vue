<script setup lang="ts">
import { useCardStore } from "@/stores/card.ts";
import { CircleX, Trash2 } from "@lucide/vue";
import AlertDialog from "../ui/alert-dialog/AlertDialog.vue";
import AlertDialogAction from "../ui/alert-dialog/AlertDialogAction.vue";
import AlertDialogCancel from "../ui/alert-dialog/AlertDialogCancel.vue";
import AlertDialogContent from "../ui/alert-dialog/AlertDialogContent.vue";
import AlertDialogDescription from "../ui/alert-dialog/AlertDialogDescription.vue";
import AlertDialogFooter from "../ui/alert-dialog/AlertDialogFooter.vue";
import AlertDialogHeader from "../ui/alert-dialog/AlertDialogHeader.vue";
import AlertDialogTitle from "../ui/alert-dialog/AlertDialogTitle.vue";
import AlertDialogTrigger from "../ui/alert-dialog/AlertDialogTrigger.vue";
import Button from "../ui/button/Button.vue";

defineProps(["cardId"]);
const emits = defineEmits(["close"]);

const { deleteCard } = useCardStore();
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button
        class="border border-(--border) bg-destructive hover:bg-destructive-hover md:w-auto w-full"
        variant="destructive"
        ><Trash2 aria-hidden /> Delete</Button
      >
    </AlertDialogTrigger>
    <AlertDialogContent
      class="bg-(--bg) border-(--border) focus:border-(--border-focus)"
    >
      <AlertDialogHeader
        ><AlertDialogTitle
          >Are you sure you want to delete this card?</AlertDialogTitle
        >
        <AlertDialogDescription
          >This action cannot be undone. This will permanently delete the card
          and all its data</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel as-child
          ><Button
            variant="ghost"
            class="border-(--border) hover:bg-(--border)/30"
          >
            <CircleX aria-hidden /> Cancel
          </Button></AlertDialogCancel
        >
        <AlertDialogAction
          class="border-(--border) bg-destructive hover:bg-destructive-hover"
          @click="
            emits('close');
            deleteCard(cardId);
          "
          ><Trash2 aria-hidden /> Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
