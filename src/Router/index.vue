<script>
import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import Game from "../components/Game.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
    },

    {
      path: "/game",
      component: Game,
      name: "Game",
    },
  ],
});

export default router;
</script>
