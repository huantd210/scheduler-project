import { PROJECT_GET_LIST } from "../constants/actionTypes";

export default {
  namespaced: true,
  state: () => {
    return {
      projects: [],
    };
  },
  getters: {
    getProjectList: (state) => state.projectList,
  },
  mutations: {
    [PROJECT_GET_LIST](state, payload) {
      state.projectList = payload.projects;
    },
  },
  actions: {
    [PROJECT_GET_LIST](context) {
      (async () => {
        try {
          const { projects } = await new Promise((resolve) => {
            const json = require("../../assets/json/data.json");

            setTimeout(() => resolve(JSON.parse(json)), 3000);
          });

          context.commit(PROJECT_GET_LIST, {
            projects,
          });
        } catch (error) {
          if (error) console.error(error);
        }
      })();
    },
  },
};
