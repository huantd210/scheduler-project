import moment from "moment";
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
    getFirstTime: (state) => moment(state.config?.firstTime, "YYYY-MM-DD"),
    getLastTime: (state) =>
      moment(state.config?.firstTime, "YYYY-MM-DD")
        .add(state.config?.range - 1, "months")
        .endOf("month"),
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
