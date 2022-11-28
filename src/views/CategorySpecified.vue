<template>
  <main>
    <!-- Whats New Start -->
    <section class="whats-news-area pt-50 pb-20">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row d-flex justify-content-between">
              <div class="col-lg-6 col-md-6">
                <div class="section-tittle mb-30">
                  <h3>
                    Top
                    <span class="text-capitalize">{{ category }}</span>
                    Headlines
                  </h3>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <!-- Nav Card -->
                <div class="tab-content" id="nav-tabContent">
                  <!-- card one -->
                  <div
                    class="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div class="whats-news-caption">
                      <div class="row" v-if="articles">
                        <div
                          class="col-lg-4"
                          v-for="article in articles"
                          :key="article.title"
                        >
                          <div class="single-what-news mb-100">
                            <div class="what-img">
                              <img :src="article.urlToImage" alt="" />
                            </div>
                            <div class="what-cap">
                              <span class="color1">{{
                                article.source.name
                              }}</span>
                              <h4>
                                <a :href="article.url" target="_blank">{{
                                  article.title
                                }}</a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-center"
                        style="height: 80vh"
                        v-else
                      >
                        <div
                          class="spinner-border text-danger mt-4"
                          role="status"
                        >
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End Nav Card -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Whats New End -->
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CategorySpecified",
  data() {
    return {
      articles: null,
      searchQuery: "",
      category: "",
    };
  },
  computed: {
    ...mapState({
      apiKey: (state) => state.apiKey,
    }),
  },
  methods: {
    getArticles(category) {
      this.axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=us&category=" +
            category,
          {
            headers: {
              Authorization: this.apiKey,
            },
          }
        )
        .then((response) => {
          this.handleResponse(response.data);
        })
        .catch((error) => console.log(error));
    },
    // handle response object and overwriting article data to iterate through in dom
    // reuseable
    handleResponse(data) {
      data.articles.forEach((element) => {
        if (!element.urlToImage) {
          element.urlToImage =
            "https://kaverisias.com/wp-content/uploads/2018/01/catalog-default-img.gif";
        }
      });
      this.articles = data.articles;
    },
  },
  mounted() {
    this.getArticles(this.$route.params.category);
    this.category = this.$route.params.category;
  },
};
</script>
