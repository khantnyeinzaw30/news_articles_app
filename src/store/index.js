import { createStore } from "vuex";

export default createStore({
  state: {
    apiKey: "d3804798c59e46579dc7c3b1b479aeef",
    categories: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ],
    sortBy: ["relevancy", "popularity", "publishedAt"],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
