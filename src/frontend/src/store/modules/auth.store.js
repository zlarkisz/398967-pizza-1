import { SET_ENTITY } from "@/store/mutations-types.js";

export default {
  namespaced: true,

  state: {
    isAuthenticated: false, // to check if the user is authorized or not
    user: null, // here we will store the authorized user
  },

  getters: {
    // a getter function to get a parameter by its name from a user object
    getUserAttribute: (state) => (attr) => state.user ? state.user[attr] : "",
  },

  actions: {
    // during a successful login:
    async login({ dispatch }, { credentials }) {
      const data = await this.$api.auth.login(credentials);
      // 1. get the token from the server and store it in LocalStorage
      this.$jwt.saveToken(data.token);
      // 2. Add an axios authorization header
      this.$api.auth.setAuthHeader();
      // Send a request for a user profile
      dispatch("getMe");
    },

    // During a logout, we can only clear the token on the frontend,
    // Or we can also send a request to the server to logout.
    // By default, we make a logout with a request to the server.
    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      // delete token in LocalStorage
      this.$jwt.destroyToken();
      // Update the axios authorization header (in fact, clear it)
      this.$api.auth.setAuthHeader();
      // We indicate that the user is not authorized and clear the user object
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "isAuthenticated", value: false },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module: "Auth", entity: "user", value: null },
        { root: true }
      );
    },

    // Get the data of an authorized user
    async getMe({ commit, dispatch }) {
      window.localStorage.setItem("isAuthenticated", true);
      try {
        const { data } = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "isAuthenticated", value: true },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module: "Auth", entity: "user", value: data },
          { root: true }
        );
      } catch (error) {
        // If the authorization token is invalid, or if we were unable to get
        // user data for some other reason, we make a logout without a logout request to the server.
        dispatch("logout", false);
      }
    },
  },
};
