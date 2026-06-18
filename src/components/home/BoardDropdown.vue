<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      as-child
      class="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
    >
      <Button
        variant="outline"
        class="w-fit absolute right-3 -translate-x-3 border-(--border) z-3"
        ><Ellipsis
      /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="bg-(--bg) border-(--border-focus) z-3">
      <DropdownMenuLabel class="font-mono text-(--secondary) text-xs"
        >Board Actions</DropdownMenuLabel
      >
      <DropdownMenuSeparator class="bg-(--border-focus)" />
      <DropdownMenuGroup>
        <DropdownMenuItem @select.prevent="isAlertOpen = true"
          ><Trash2 /> Delete Board</DropdownMenuItem
        >
        <DropdownMenuItem @select.prevent="isDialogOpen = true"
          ><Edit3 /> Edit Board</DropdownMenuItem
        >
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  <DeleteDialog v-model:open="isAlertOpen" :boardId="boardId" />
  <EditBoard v-model:open="isDialogOpen" :boardId="boardId" />
</template>

<script lang="ts" setup>
import { Edit3, Ellipsis, Trash2 } from "@lucide/vue";
import { ref } from "vue";
import DeleteDialog from "./DeleteDialog.vue";
import EditBoard from "./EditBoard.vue";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "../ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "../ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuLabel from "../ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuSeparator from "../ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuGroup from "../ui/dropdown-menu/DropdownMenuGroup.vue";
import DropdownMenuItem from "../ui/dropdown-menu/DropdownMenuItem.vue";
import Button from "../ui/button/Button.vue";

const isAlertOpen = ref(false);
const isDialogOpen = ref(false);
defineProps(["boardId"]);
</script>

<style></style>
