<script setup lang="ts">
import { CircleX, Trash2 } from "@lucide/vue";
import { useBoardStore } from "@/stores/board.ts";
import AlertDialog from "../ui/alert-dialog/AlertDialog.vue";
import AlertDialogContent from "../ui/alert-dialog/AlertDialogContent.vue";
import AlertDialogHeader from "../ui/alert-dialog/AlertDialogHeader.vue";
import AlertDialogTitle from "../ui/alert-dialog/AlertDialogTitle.vue";
import AlertDialogFooter from "../ui/alert-dialog/AlertDialogFooter.vue";
import AlertDialogDescription from "../ui/alert-dialog/AlertDialogDescription.vue";
import AlertDialogCancel from "../ui/alert-dialog/AlertDialogCancel.vue";
import AlertDialogAction from "../ui/alert-dialog/AlertDialogAction.vue";
import Button from "../ui/button/Button.vue";

defineProps(["open", "boardId"]);
defineEmits(["update:open"]);
const { deleteBoard } = useBoardStore();
</script>

<template>
  <AlertDialog :open="open" @update:open="$emit('update:open', $event)">
    <AlertDialogContent
      class="bg-(--bg) border-(--border) focus:border-(--border-focus)"
    >
      <AlertDialogHeader
        ><AlertDialogTitle
          >Are you sure you want to delete this board?</AlertDialogTitle
        >
        <AlertDialogDescription
          >This action cannot be undone. This will permanently delete the board
          and all its data</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel as-child
          ><Button
            variant="ghost"
            class="border-(--border) hover:bg-(--border)/30"
          >
            <CircleX /> Cancel
          </Button></AlertDialogCancel
        >
        <AlertDialogAction
          class="border-(--border) bg-destructive hover:bg-destructive-hover"
          @click="deleteBoard(boardId)"
          ><Trash2 /> Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
