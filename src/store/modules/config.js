import moment from "moment";
import {
  SCHEDULE_SET_TIME,
  SCHEDULE_SET_RANGE,
  SCHEDULE_SET_COLOR,
} from "../../constants/actionTypes";

export default {
  namespaced: true,
  state: () => {
    return {
      width: 30,
      height: 30,
      firstTime: "",
      range: 6, // default 6 months
    };
  },
  getters: {
    getConfig: (state) => state,
    getFirstTime: (state) => moment(state?.firstTime, "YYYY-MM-DD"),
    getLastTime: (state) =>
      moment(state?.firstTime, "YYYY-MM-DD")
        .add(state?.range - 1, "months")
        .endOf("month"),
  },
  mutations: {
    [SCHEDULE_SET_TIME](state, payload) {
      state.firstTime = payload.firstTime;
    },
    [SCHEDULE_SET_RANGE](state, payload) {
      state.range = payload.range;
    },
  },
  actions: {
    [SCHEDULE_SET_TIME](context, payload) {
      context.commit(SCHEDULE_SET_TIME, payload);
    },
    [SCHEDULE_SET_RANGE](context, payload) {
      context.commit(SCHEDULE_SET_RANGE, payload);
    },
    [SCHEDULE_SET_COLOR](context) {
      context.commit(SCHEDULE_SET_COLOR, {});
    },
  },
};
