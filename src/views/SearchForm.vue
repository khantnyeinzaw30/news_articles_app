<template>
  <main>
    <div class="container search-area">
      <div class="row my-5">
        <h5 class="text-uppercase fw-bold text-center text-danger mb-3">
          Search Articles
        </h5>

        <div class="alert alert-danger" v-if="validationError">
          {{ validationError }}
        </div>

        <form @submit.prevent="search">
          <div class="row mb-3">
            <label class="col-form-label col-sm-3">Sort By</label>
            <div class="col-sm-9">
              <select class="form-select" v-model="formData.sortOption">
                <option value="">Sort articles</option>
                <option
                  :value="s"
                  v-for="s in sortBy"
                  :key="s"
                  class="text-capitalize"
                >
                  {{ s }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label class="col-form-label col-sm-3">Topic</label>
            <div class="search-box col-sm-9">
              <input
                type="text"
                placeholder="eg. apple or elon musk or something"
                v-model="formData.searchQuery"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label class="col-form-label col-sm-3">From</label>
            <div class="col-sm-9">
              <input
                type="date"
                class="form-control"
                v-model="formData.dateFrom"
              />
            </div>
          </div>

          <div class="row mb-3">
            <label class="col-form-label col-sm-3">To</label>
            <div class="col-sm-9">
              <input
                type="date"
                class="form-control"
                v-model="formData.dateTo"
              />
            </div>
          </div>

          <div class="mb-3 d-flex justify-content-center">
            <input
              type="submit"
              value="Confirm Search"
              class="btn btn-danger"
            />
          </div>
        </form>
      </div>
    </div>

    <!-- News results start -->
    <section class="whats-news-area pb-20" v-if="articles">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row d-flex justify-content-between">
              <div class="col-lg-3 col-md-3">
                <div class="section-tittle mb-30">
                  <h3>Results</h3>
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
                      <div class="row">
                        <div
                          class="col-lg-4 col-md-6"
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
    <!-- News results end -->
  </main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SearchForm",
  data() {
    return {
      articles: null,
      formData: {
        sortOption: "",
        searchQuery: "",
        dateFrom: "",
        dateTo: "",
      },
      validationError: "",
    };
  },
  computed: {
    ...mapState({
      sortBy: (state) => state.sortBy,
      apiKey: (state) => state.apiKey,
    }),
  },
  methods: {
    search() {
      if (
        this.formData.searchQuery &&
        this.formData.sortOption &&
        this.formData.dateFrom &&
        this.formData.dateTo
      ) {
        this.validationError = "";
        this.axios
          .get(
            `https://newsapi.org/v2/everything?searchIn=title&q=${this.formData.searchQuery}&from=${this.formData.dateFrom}&to=${this.formData.dateTo}&sortBy=${this.formData.sortOption}&pageSize=30&language=en`,
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
      } else {
        this.validationError = "please fill all information!";
      }
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
};
</script>
