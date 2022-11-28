import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchForm from "../views/SearchForm.vue";
import Sources from "../views/SourcesView.vue";
import Category from "../views/CategorySpecified.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "SearchForm",
    component: SearchForm,
  },
  {
    path: "/sources",
    name: "Sources",
    component: Sources,
  },
  {
    path: "/:category",
    name: "Category",
    component: Category,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
