<template>
  <div class="container" :class="{ loadingItem: isProductLoading }">
    <div class="row text-center" v-if="isProductLoading">
      <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
    </div>

    <div v-else class="row action-panel">
      <div class="col-12">
        <div class="btn-group btn-group-sm pull-right">
          <button id="list" class="btn btn-outline-dark" @click.prevent="changeDisplay(true)">
            <i class="fa fa-list" aria-hidden="true"></i> List
          </button>
          <button id="grid" class="btn btn-outline-dark" @click.prevent="changeDisplay(false)">
            <i class="fa fa-th" aria-hidden="true"></i> Grid
          </button>
        </div>
        <form class="form-inline">
          <i class="fa fa-search" aria-hidden="true"></i>
          <input type="text" v-model="search" class="form-control form-control-sm ml-3 w-40" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>

    <div class="row" v-if="!isProductLoading">
      <app-product-item v-for="prod in filteredList" :item="prod" :key="prod.id" :displayList="displayList"></app-product-item>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductItem from "./product/ProductItem.vue";
import GridLoader from "vue-spinner/src/MoonLoader.vue";

export default {
  data() {
    return {
      loaderColor: "#1a52c6",
      loaderSize: "150px",
      displayList: false,
      search: "",
    };
  },
  computed: {
    ...mapGetters(["products", "isProductLoading"]),

    filteredList() {
      return this.products.filter((prod) => {
        return (
          (prod.name.toLowerCase().includes(this.search.toLowerCase()) ||
            prod.brand.toLowerCase().includes(this.search.toLowerCase()) ||
            prod.category.toLowerCase().includes(this.search.toLowerCase())) &&
          prod.sale != 1
        );
      });
    },
  },
  components: {
    appProductItem: ProductItem,
    GridLoader,
  },
  methods: {
    ...mapActions(["isStudent"]),
    changeDisplay(isList) {
      this.displayList = isList;
    },
  },
};
</script>

<style>
div.card {
  height: 100%;
}
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}

.search-wrapper {
  padding: 0 0 5px 0;
}
</style>
