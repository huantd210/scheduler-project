import Vue from "vue";
import Vuex from "vuex";
import moduleConfig from "./modules/config";
import moduleProject from "./modules/project";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    config: moduleConfig,
    project: moduleProject,
  },
});
