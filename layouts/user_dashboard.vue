<template>
  <div class="text-gray-800 flex flex-col min-h-screen w-full">
    <div class="relative">
      <div class="border-b relative">
        <div class="container mx-auto px-4">
          <div class="flex items-center md:justify-between py-4">
            <div class="w-1/3 sm:w-1/4 md:hidden">
              <svg
                class="fill-current h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                @click="isNavOpened = !isNavOpened"
              >
                <path
                  d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"
                />
              </svg>
            </div>
            <div class="w-1/3 sm:w-1/2 md:w-auto text-center">
              <nuxt-link to="/">
                <img
                  src="~/assets/images/logo-nav.png"
                  alt="Printree Studio"
                  class="w-28 object-fit"
                />
              </nuxt-link>
            </div>
            <div class="w-1/4 md:w-auto md:flex text-right">
              <VueTailwindDropdown width="200px">
                <template v-slot:trigger>
                  <div
                    class="hidden md:block md:flex md:items-center ml-2 cursor-pointer hover:text-primary"
                  >
                    <span class="text-sm mr-1">{{ user.shop ? `${user.shop.name}'s` : user.name }}</span>
                    <div>
                      <font-awesome-icon :icon="['fas', 'chevron-down']" />
                    </div>
                  </div>
                </template>
                <template v-slot:content>
                  <div class="flex flex-col flex-grow">
                    <nuxt-link
                      to="/dashboard/account-settings"
                      class="flex items-center hover:bg-gray-200 px-4 py-2"
                    >
                      <span class="mr-2 w-6">
                        <font-awesome-icon :icon="['fas', 'cog']" />
                      </span>
                      <span>Account Settings</span>
                    </nuxt-link>
                  </div>
                  <div class="flex flex-col flex-grow">
                    <a
                      href="#"
                      class="flex items-center hover:bg-gray-200 px-4 py-2"
                      @click.prevent="signOut"
                    >
                      <span class="mr-2 w-6">
                        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                      </span>
                      <span>Logout</span>
                    </a>
                  </div>
                </template>
              </VueTailwindDropdown>
            </div>
          </div>
        </div>

        <div
          class="sm:hidden absolute w-full top-full z-10 bg-white shadow-xl left-0"
          v-if="isNavOpened"
          v-click-outside="() => isNavOpened = false"
        >
          <div>
            <nuxt-link
              to="/dashboard/collections/"
              class="flex items-center hover:bg-gray-200 px-4 py-2"
            >
              <span class="mr-2 w-6">
                <font-awesome-icon :icon="['fas', 'boxes']" />
              </span>
              <span>Collections</span>
            </nuxt-link>
          </div>
          <div>
            <nuxt-link
              to="/dashboard/payout/"
              class="flex items-center hover:bg-gray-200 px-4 py-2"
            >
              <span class="mr-2 w-6">
                <font-awesome-icon :icon="['fas', 'receipt']" />
              </span>
              <span>Payouts</span>
            </nuxt-link>
          </div>
          <div>
            <nuxt-link
              to="/dashboard/shop/settings"
              class="flex items-center hover:bg-gray-200 px-4 py-2"
            >
              <span class="mr-2 w-6">
                <font-awesome-icon :icon="['fas', 'store']" />
              </span>
              <span>Shop Settings</span>
            </nuxt-link>
          </div>
          <div>
            <a
              href="#"
              class="flex items-center hover:bg-gray-200 px-4 py-2"
              @click.prevent="signOut"
            >
              <span class="mr-2 w-6">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              </span>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
      <div class="hidden bg-blue-dark md:block md:bg-white md:border-b">
        <div class="container mx-auto px-4">
          <div class="md:flex justify-between items-center">
            <div class="flex">
              <div class="flex -mb-px mr-8">
                <nuxt-link
                  to="/dashboard/collections"
                  class="no-underline flex items-center py-4 border-b border-transparent md:hover:border-grey-dark uppercase font-bold text-sm"
                  active-class="text-primary"
                >
                  <span class="h-6 w-6 fill-current mr-2 flex items-center justify-center">
                    <font-awesome-icon :icon="['fas', 'boxes']" />
                  </span>
                  My Collections
                </nuxt-link>
              </div>
              <div class="flex -mb-px mr-8" v-if="userTypeIs('seller')">
                <nuxt-link
                  to="/dashboard/payout"
                  class="no-underline flex items-center py-4 border-b border-transparent md:hover:border-grey-dark uppercase font-bold text-sm"
                  active-class="text-primary"
                >
                  <span
                    class="h-6 w-6 fill-current mr-2 flex items-center justify-center"
                    flex
                    items-center
                    justify-center
                  >
                    <font-awesome-icon :icon="['fas', 'receipt']" />
                  </span> Payouts
                </nuxt-link>
              </div>
              <div class="flex -mb-px mr-8" v-if="userTypeIs('seller')">
                <nuxt-link
                  to="/dashboard/shop/settings"
                  class="no-underline flex items-center py-4 border-b border-transparent md:hover:border-grey-dark uppercase font-bold text-sm"
                  active-class="text-primary"
                >
                  <span
                    class="h-6 w-6 fill-current mr-2 flex items-center justify-center"
                    flex
                    items-center
                    justify-center
                  >
                    <font-awesome-icon :icon="['fas', 'cog']" />
                  </span> Shop Settings
                </nuxt-link>
              </div>
            </div>

            <div v-if="userTypeIs('seller')" class="flex items-center">
              <div>
                <TotalProfitCounter />
              </div>
              <div class="flex -mb-px ml-8">
                <a
                  :href="`/marketplace/shop/${user.shop.slug}`"
                  target="_blank"
                  class="no-underline flex items-center py-4 border-b border-transparent md:hover:border-grey-dark uppercase font-bold text-sm"
                >
                  <span
                    class="h-6 w-6 fill-current mr-2 flex items-center justify-center"
                    flex
                    items-center
                    justify-center
                  >
                    <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                  </span> My Shop
                  <span
                    class="h-6 w-6 fill-current ml-2 flex items-center justify-center"
                    flex
                    items-center
                    justify-center
                  >
                    <font-awesome-icon :icon="['fas', 'external-link-alt']" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-grow container mx-auto sm:px-4 pt-6 pb-8 sm:px-0 px-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TotalProfitCounter from "@/components/TotalProfitCounter";
import VueTailwindDropdown from "@/components/VueTailwindDropdown";
import { mapGetters } from "vuex";
import UserTypeCheckerMixin from "@/components/Mixins/UserTypeChecker";

export default {
  head: {
    title: "Printree Studio",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  mixins: [UserTypeCheckerMixin],
  middleware: ["authenticated"],
  components: {
    VueTailwindDropdown,
    TotalProfitCounter,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
    }),
  },
  data() {
    return {
      isNavOpened: false,
    };
  },
  mounted() {
    document.body.style.overflow = "auto";
    this.$flags.set("single", "off");
  },
  methods: {
    async signOut() {
      await this.$router.replace("/");
      setTimeout(() => {
        this.$store.dispatch("user/signOut");
      });
    },
    _encodeUri(uri) {
      return encodeURIComponent(uri);
    },
  },
};
</script>
