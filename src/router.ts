import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedLoadedGeneric,
} from "vue-router";
import Board from "./pages/Board.vue";
import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";
import { useBoardStore } from "./stores/board.ts";
const routes = [
  { path: "/", component: Home, meta: { title: "Home Page — Flowboard" } },
  {
    path: "/board/:boardId",
    component: Board,
    beforeEnter: (to: RouteLocationNormalizedLoadedGeneric) => {
      const { boards } = useBoardStore();
      if (!boards[to.params.boardId as string]) {
        return { path: "/404" };
      }
    },
  },
  {
    path: "/:pathMatch(.*)",
    component: NotFound,
    meta: { title: "404 Page - Flowboard" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = (to.meta.title as string) ?? "Flowboard";
});
