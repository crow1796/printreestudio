<template>
  <div class="container mx-auto">
    <div class="relative min-h-area-loader">
      <AreaLoader v-if="$fetchState.pending" />
      <div class="font-bold text-2xl mt-6 mb-2 px-8">{{ meta ? meta.name : "Collection Products" }}</div>

      <div class="flex justify-between items-center mx-8" v-if="meta">
        <div>
          <BreadCrumbs home-link="/marketplace" :items="breadCrumbItems" />
        </div>
      </div>
      <ProductsGrid :products="products" />
      <div class="flex flex-grow justify-center pb-6 mt-4">
        <SimplePagination
          @prev="goTo(prev)"
          @next="goTo(next)"
          v-if="products && products.length >= query.pagination.limit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsGrid from "@/components/ProductsGrid";
import BreadCrumbs from "@/components/BreadCrumbs";
import SimplePagination from "@/components/SimplePagination";

export default {
  layout: "marketplace",
  components: {
    ProductsGrid,
    SimplePagination,
    BreadCrumbs,
  },
  head() {
    return {
      title: `${this.meta?.name || ""} | Printree Studio`,
    };
  },
  created() {
    const page = this.$route.query.page;
    if (page === undefined)
      return this.$router.replace(
        `/marketplace/collections/${this.$route.params.id}/?page=1`
      );
    this.currentPage = parseInt(page);
  },
  async fetch() {
    this.meta = await this.$store.dispatch(
      "marketplace/getCollectionMeta",
      this.$route.params.id
    );
    console.log(this.meta)
  },
  data() {
    return {
      lastItem: null,
      firstItem: null,
      isLoading: true,
      products: [],
      meta: null,
      currentPage: this.$route.query.page,
      query: {
        plan: ["Sell"],
        status: ["approved"],
        productStatus: ["approved"],
        collectionId: this.$route.params.id,
        sorting: {
          field: "created_at",
          order: "DESC",
        },
        pagination: {
          limit: 15,
          page: 0,
        },
      },
    };
  },
  methods: {
    goTo(page) {
      if (page === this.query.pagination.page) return;
      this.query.pagination.page = page;
      this._reloadRoute();
    },
    _reloadRoute() {
      this.$router.replace({
        path: `/marketplace/collections/${this.$route.params.id}/`,
        query: {
          page: this.query.pagination.page,
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    async _loadItems() {
      this.isLoading = true;
      const res = await this.$store.dispatch("marketplace/getProductsToSell", {
        ...this.query,
        pagination: {
          ...this.query.pagination,
          page: this.query.pagination.page - 1,
        },
      });
      this.products = res;
      this.isLoading = false;
    },
  },
  computed: {
    next() {
      return parseInt(this.$route.query.page) + 1;
    },
    prev() {
      const page = parseInt(this.$route.query.page);
      return page > 1 ? page - 1 : 1;
    },
    breadCrumbItems() {
      let items = [];

      if (this.meta.user?.shop)
        items.push({
          title: this.meta.user.shop.name,
          link: `/marketplace/shop/${this.meta.user.shop.slug}`,
        });

      items.push({
        title: this.meta.name,
        active: true,
      });

      return items;
    },
  },
  watch: {
    "$route.query.page": {
      immediate: true,
      handler(to, from) {
        if (!to) return;
        this.query.pagination.page = parseInt(to);
      },
    },
    query: {
      deep: true,
      immediate: true,
      async handler(to, from) {
        await this._loadItems();
      },
    },
  },
};
</script>