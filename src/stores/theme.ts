import { type Theme } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore(
  "ThemeStore",
  () => {
    const theme = ref<Theme>("system");
    function toggleTheme() {
      if (theme.value === "system") {
        theme.value = "light";
      } else if (theme.value === "light") {
        theme.value = "dark";
      } else if (theme.value === "dark") {
        theme.value = "system";
      }
    }

    return { theme, toggleTheme };
  },
  { persist: true },
);
