<script setup lang="ts">
import { useColumnStore } from "@/stores/column.ts";
import { CircleX, Trash2 } from "@lucide/vue";
import AlertDialog from "../ui/alert-dialog/AlertDialog.vue";
import AlertDialogContent from "../ui/alert-dialog/AlertDialogContent.vue";
import AlertDialogHeader from "../ui/alert-dialog/AlertDialogHeader.vue";
import AlertDialogTitle from "../ui/alert-dialog/AlertDialogTitle.vue";
import AlertDialogDescription from "../ui/alert-dialog/AlertDialogDescription.vue";
import AlertDialogFooter from "../ui/alert-dialog/AlertDialogFooter.vue";
import AlertDialogAction from "../ui/alert-dialog/AlertDialogAction.vue";
import AlertDialogCancel from "../ui/alert-dialog/AlertDialogCancel.vue";
import AlertDialogTrigger from "../ui/alert-dialog/AlertDialogTrigger.vue";
import Button from "../ui/button/Button.vue";

defineProps(["columnId"]);

const { deleteColumn } = useColumnStore();
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button
        class="w-auto h-auto rounded-full p-1.5! hover:bg-(--surface)"
        aria-label="Delete Column"
        data-test="deleteColumnButton"
        ><Trash2
      /></Button>
    </AlertDialogTrigger>
    <AlertDialogContent
      class="bg-(--bg) border-(--border) focus:border-(--border-focus)"
      data-test="deleteColumnAlert"
    >
      <AlertDialogHeader
        ><AlertDialogTitle
          >Are you sure you want to delete this column?</AlertDialogTitle
        >
        <AlertDialogDescription
          >This action cannot be undone. This will permanently delete the column
          and all its data</AlertDialogDescription
        >
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel as-child
          ><Button
            variant="ghost"
            class="border-(--border) hover:bg-(--border)/30"
            data-test="cancelDeleteButton"
          >
            <CircleX aria-hidden /> Cancel
          </Button></AlertDialogCancel
        >
        <AlertDialogAction
          class="border-(--border) bg-destructive hover:bg-destructive-hover"
          @click="deleteColumn(columnId)"
          data-test="confirmDeleteButton"
          ><Trash2 aria-hidden /> Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
