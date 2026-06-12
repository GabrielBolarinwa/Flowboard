import { createRouter, createWebHistory } from "vue-router";
import Board from "./pages/Board.vue";
import Home from "./pages/Home.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/board/:boardId", component: Board },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
