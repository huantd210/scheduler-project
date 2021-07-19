import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import moduleConfig from "./modules/config";
import moduleProject from "./modules/project";

Vue.use(Vuex);

const secureLS = new SecureLS({
  encodingType: "aes",
  encryptionSecret: process.env.VUE_APP_SECURE_LS_SECRET,
  isCompression: true,
});

export default new Vuex.Store({
  modules: {
    config: moduleConfig,
    project: moduleProject,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => secureLS.get(key),
        setItem: (key, value) => secureLS.set(key, value),
        removeItem: (key) => secureLS.remove(key),
      },
      paths: ["config"],
    }),
  ],
});
