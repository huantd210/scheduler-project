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
        width: 30,
        height: 30,
        firstTime: "2021-01-07",
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
