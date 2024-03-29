import auth from "~/plugins/lib/auth/index";

const state = () => ({
});

const mutations = {
};

const getters = {
};

const actions = {
  async createAccount(context, data) {
    let res = await auth.createUserWithEmailAndPassword(data, this.$axios);
    if(!res.status) throw res
    /**
     * TODO: Hide when removing the user approval flow
     */
    // await context.dispatch('signIn', data);
    return res;
  },
  async signIn(context, data) {
    let res = await this.$auth.loginWith('local', {
      data,
    })
    if(!res.status) throw res
    return res;
  },
  async sendPasswordRecovery(context, data) {
    const res = await auth.sendPasswordRecoveryEmail(data.email, this.$axios);
    return res;
  },
  async updatePassword(context, data) {
    const res = await auth.updatePassword(data, this.$axios);
    return res;
  },
  async signOut(context) {
    this.$storage.removeLocalStorage('current_design_id')
    await this.$auth.logout();
  },
  async signInAsAGuest(context) {
    const response = await auth.signInAsAGuest();
    return response;
  },
  async updateAccount(context, data) {
    const response = await this.$api.userDashboard.updateAccount({
      email: data.email,
      name: data.name,
    });
    this.$auth.fetchUser();
    return response;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
