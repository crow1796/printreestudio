<template>
  <VueTailwindModal
    ref="authFormModal"
    width="500px"
    content-class="text-gray-600 overflow-hidden relative"
    :backdrop="false"
  >
    <div class="flex flex-col relative px-4 pb-4">
      <div
        class="select-none absolute right-0 top-0 mr-3 mt-3 cursor-pointer w-8 h-8 border rounded-full flex justify-center items-center hover:border-gray-600 hover:text-gray-700"
        @click="$refs.authFormModal.hide()"
      >
        <font-awesome-icon :icon="['fas', 'times']" class="text-xs" />
      </div>
      <div class="flex modal-body">
        <AuthForm @login-success="loginSuccess" @reset-success="$refs.authFormModal.hide()" :type="type" :form="form"/>
      </div>
    </div>
  </VueTailwindModal>
</template>

<script>
import VueTailwindModal from "@/components/VueTailwindModal";
import AuthForm from "@/components/Auth/AuthForm";

export default {
  components: {
    VueTailwindModal,
    AuthForm,
  },
  props: {
    type: {
      type: String,
      default: "seller",
    },
    form: {
      type: String,
      default: "sign_in",
    },
  },
  methods: {
    show() {
      this.$refs.authFormModal.show();
    },
    hide() {
      this.$refs.authFormModal.hide();
    },
    loginSuccess() {
      this.$emit("login-success");
    },
  },
};
</script>
