<template>
  <div class="flex flex-grow flex-col">
    <NoMobileModal ref="noMobileModal" />
    <AuthModal ref="authModal" @login-success="$router.replace('/dashboard')" />
    <div class="flex flex-grow">
      <div class="flex flex-grow bg-white relative z-50">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between py-4">
            <div class="flex flex-grow">
              <nuxt-link to="/">
                <img
                  src="~/assets/images/logo-nav.png"
                  alt="Printree Studio"
                  class="w-28 object-fit"
                />
              </nuxt-link>
            </div>

            <div class="flex flex-grow hidden sm:flex sm:items-center justify-end">
              <!-- <nuxt-link
                to="/marketplace"
                class="text-gray-800 font-semibold hover:text-primary-lighter mr-4"
              >Marketplace</nuxt-link>-->
              <nuxt-link
                :to="dashboardLink"
                class="text-gray-800 text-sm font-semibold border px-4 py-2 rounded hover:text-primary-lighter hover:border-primary-lighter bg-white"
                v-if="isLoggedIn && user"
              >
                <span>
                  <span>{{ user.shop ? `${user.shop.name}'s` : user.email }}</span>
                  <span class="ml-3">
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </span>
                </span>
              </nuxt-link>
              <a
                href="#"
                class="text-gray-800 text-sm font-semibold border px-4 py-2 rounded hover:text-primary-lighter hover:border-primary-lighter bg-white"
                @click.prevent="showAuthModal"
                v-else
              >Get Started</a>
            </div>

            <div class="sm:hidden cursor-pointer">
              <font-awesome-icon :icon="['fas', 'bars']" @click="isNavOpened = !isNavOpened" />
            </div>

            <div
              class="sm:hidden absolute w-full top-full z-10 bg-white shadow-xl left-0"
              v-if="isNavOpened"
              v-click-outside="() => isNavOpened = false"
            >
              <div v-if="!isLoggedIn || !user">
                <nuxt-link to="/marketplace/" class="flex items-center hover:bg-gray-200 px-4 py-2">
                  <span class="mr-2">
                    <font-awesome-icon :icon="['fas', 'store']" />
                  </span>
                  <span>View All Shops</span>
                </nuxt-link>
              </div>
              <div v-if="isLoggedIn && user._id">
                <div>
                  <nuxt-link
                    to="/dashboard"
                    class="flex items-center hover:bg-gray-200 px-4 py-2"
                  >
                    <span class="mr-2">
                      <font-awesome-icon :icon="['fas', 'cog']" />
                    </span>
                    <span>Dashboard</span>
                  </nuxt-link>
                </div>
                <div>
                  <a
                    href="#"
                    class="flex items-center hover:bg-gray-200 px-4 py-2"
                    @click.prevent="signOut"
                  >
                    <span class="mr-2">
                      <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                    </span>
                    <span>Logout</span>
                  </a>
                </div>
              </div>
              <div v-else>
                <a
                  href="#"
                  class="flex items-center hover:bg-gray-200 px-4 py-2"
                  id="get-started-btn"
                  @click.prevent="$refs.authModal.show()"
                >
                  <span class="mr-2">
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                  </span>
                  <span>Sign In</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-grow">
      <div class="container sm:mx-auto mx-4">
        <nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthModal from "@/components/Auth/AuthModal";
import Footer from "@/components/Footer";
import NoMobileModal from "@/components/NoMobileModal";
import { isMobile } from "@/helpers";

export default {
  head: {
    title: "Printree Studio",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  components: {
    Footer,
    AuthModal,
    NoMobileModal,
  },
  created() {
    const inviteCode = this.$route.query.invite;
    if (inviteCode) this.$storage.setCookie("invite", inviteCode);
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      user: "user",
    }),
    dashboardLink() {
      if (!this.user) return "/dashboard";
      const isAdmin = _.includes(_.map(this.user.roles, "name"), "admin");
      const isCustomer = _.includes(_.map(this.user.roles, "name"), "customer");
      if (isCustomer) return "/marketplace/account/profile";
      if (isAdmin) return "/admin/collections";
      return "/dashboard";
    },
  },
  data() {
    return {
      isNavOpened: false,
    };
  },
  methods: {
    showAuthModal() {
      if (isMobile()) {
        this.$refs.noMobileModal.show();
        return;
      }
      this.$refs.authModal.show();
    },
    async signOut() {
      this.$router.replace("/");
      await this.$store.dispatch("user/signOut");
    },
  },
};
</script>
