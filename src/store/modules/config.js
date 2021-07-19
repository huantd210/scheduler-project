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
      range: "",
      colors: {
        negotiate: "#ee5253",
        notStarted: "#ff9f43",
        started: "#05c46b",
        maintenance: "#fffa65",
        finished: "#3c40c6",
      },
    };
  },
  getters: {
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
    [SCHEDULE_SET_COLOR](state, payload) {
      state.colors = {
        ...state.colors,
        ...payload.colors,
      };
    },
  },
  actions: {
    [SCHEDULE_SET_TIME](context, payload) {
      context.commit(SCHEDULE_SET_TIME, payload);
    },
    [SCHEDULE_SET_RANGE](context, payload) {
      context.commit(SCHEDULE_SET_RANGE, payload);
    },
    [SCHEDULE_SET_COLOR](context, payload) {
      context.commit(SCHEDULE_SET_COLOR, payload);
    },
  },
};
