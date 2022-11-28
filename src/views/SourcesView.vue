<template>
  <main>
    <div class="container">
      <div class="row my-4">
        <label class="col-form-label fw-bold text-danger col-lg-2 offset-4"
          >Choose Category</label
        >
        <div class="col-lg-4">
          <select
            class="form-select"
            @change="filterWithCategory"
            v-model="valueToFilter"
          >
            <option value="">All</option>
            <option
              class="text-capitalize"
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <table class="table" v-if="sources">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Language</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="source in sources" :key="source.id">
                <th scope="row">{{ source.id }}</th>
                <td>
                  <a :href="source.url" class="text-primary" target="_blank">{{
                    source.name
                  }}</a>
                </td>
                <td>{{ source.description }}</td>
                <td>{{ source.language }}</td>
                <td>{{ source.category }}</td>
              </tr>
            </tbody>
          </table>
          <div
            class="d-flex justify-content-center"
            style="height: 80vh"
            v-else
          >
            <div class="spinner-border text-danger mt-4" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SourcesView",
  data() {
    return {
      sources: null,
      valueToFilter: "",
    };
  },
  computed: {
    ...mapState({
      apiKey: (state) => state.apiKey,
      categories: (state) => state.categories,
    }),
  },
  methods: {
    getSources() {
      this.axios
        .get("https://newsapi.org/v2/top-headlines/sources", {
          headers: {
            Authorization: this.apiKey,
          },
        })
        .then((response) => {
          this.sources = response.data.sources;
        })
        .catch((error) => console.log(error));
    },
    filterWithCategory() {
      this.axios
        .get(
          "https://newsapi.org/v2/top-headlines/sources?category=" +
            this.valueToFilter,
          {
            headers: {
              Authorization: this.apiKey,
            },
          }
        )
        .then((response) => {
          this.sources = response.data.sources;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getSources();
  },
};
</script>
