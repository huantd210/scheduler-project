import {
  PROJECT_GET_LIST,
  PROJECT_CREATE,
  PROJECT_EDIT,
  PROJECT_SELECTED,
} from "../../constants/actionTypes";
// import { filterProjects } from "../../utils";

export default {
  namespaced: true,
  state: () => {
    return {
      projects: [],
      projectSelected: "",
    };
  },
  getters: {
    getProjects: (state) => state.projects,
    getProjectSelected: (state) => state.projectSelected,
  },
  mutations: {
    [PROJECT_GET_LIST](state, payload) {
      state.projects = payload.projects;
    },
    [PROJECT_CREATE](state, payload) {
      state.projects.push(payload?.project);
      console.log(state);
    },
    [PROJECT_EDIT](state, payload) {
      state.projects = state.projects.map((it) =>
        it.id !== payload?.project?.id ? it : payload?.project
      );
    },
    [PROJECT_SELECTED](state, payload) {
      state.projectSelected = payload?.project;
      console.log(state.projectSelected);
    },
  },
  actions: {
    [PROJECT_GET_LIST]({ commit }) {
      (async () => {
        try {
          let { projects } = await new Promise((resolve) => {
            const json = require("../../assets/json/data.json");

            setTimeout(() => resolve(json), 0);
          });
          // projects = filterProjects(
          //   projects,
          //   rootState?.config?.firstTime,
          //   rootState?.config?.range
          // );

          commit(PROJECT_GET_LIST, {
            projects,
          });
        } catch (error) {
          if (error) console.error(error);
        }
      })();
    },
    [PROJECT_CREATE](context, payload) {
      context.commit(PROJECT_CREATE, payload);
    },
    [PROJECT_EDIT](context, payload) {
      context.commit(PROJECT_EDIT, payload);
    },
    [PROJECT_SELECTED](context, payload) {
      context.commit(PROJECT_SELECTED, payload);
    },
  },
};
