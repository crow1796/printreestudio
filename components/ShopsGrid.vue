<template>
  <div class="mx-6 grid-cols-1 sm:grid-cols-3" :class="['grid', `md:grid-cols-${grid}`]">
    <nuxt-link
      class="p-2"
      v-for="shop in shops"
      :key="shop.slug"
      :to="`${rootUrl}${shop.slug}`"
      :title="shop.name"
    >
      <div
        class="overflow-hidden hover:shadow-lg border rounded relative w-full"
      >
        <div class="relative pt-3 px-8 flex items-center justify-center" :style="{height: '200px'}">
          <progressive-img class="relative w-40" :src="logoOf(shop)" style="width: 160px;" />
        </div>
        <div class="relative text-grey-600 px-6 pb-6">
          <span class="block font-bold w-full text-center truncate leading-none">{{shop.name}}</span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import PrintreeLogo from "~/assets/images/logo-nav.png";

export default {
  props: {
    shops: {
      default: () => [],
    },
    grid: {
      default: "5",
    },
    rootUrl: {
      default: "/marketplace/shop/",
    },
  },
  methods: {
    logoOf(shop) {
      let logo = PrintreeLogo;
      if (shop.logo) logo = shop.logo;
      return logo;
    },
  },
  computed: {
    gridClass() {
      let cls = "w-5/5";

      if (this.grid === 4) {
        cls = "w-3/12";
      }

      if (this.grid === 3) {
        cls = "w-4/12";
      }

      return `sm:${cls}`;
    },
  },
};
</script>