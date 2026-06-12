import { createMemoryHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Board from "./pages/Board.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/board/:boardId", component: Board },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
