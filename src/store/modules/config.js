import {
  SCHEDULE_SET_TIME,
  SCHEDULE_SET_SIZE,
  SCHEDULE_SET_COLOR,
} from "../../constants/actionTypes";

export default {
  namespaced: true,
  state: () => {
    return {
      config: {
        width: 35,
        height: 35,
        start: 1,
        end: 12,
        begin: "2021-01-01",
        range: 12, // default 12 months
      },
    };
  },
  getters: {
    getConfig: (state) => state.config,
  },
  mutations: {
    [SCHEDULE_SET_TIME](state, payload) {
      state.config = {
        ...state.config,
        ...payload.config,
      };
    },
  },
  actions: {
    [SCHEDULE_SET_TIME](context) {
      context.commit(SCHEDULE_SET_TIME, {});
    },
    [SCHEDULE_SET_SIZE](context) {
      context.commit(SCHEDULE_SET_SIZE, {});
    },
    [SCHEDULE_SET_COLOR](context) {
      context.commit(SCHEDULE_SET_COLOR, {});
    },
  },
};
