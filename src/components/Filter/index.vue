<template>
  <div class="schedule-filter inline-flex space-x-2">
    <el-date-picker
      style="max-width: 140px"
      v-model="firstTime"
      type="date"
      placeholder="Ngày bắt đầu"
      size="small"
      format="dd/MM/yyyy"
      :picker-options="pickerOptions"
      @change="onConfigChange"
    >
    </el-date-picker>
    <el-select
      style="max-width: 140px"
      v-model="range"
      placeholder="Khoảng thời gian"
      size="small"
      @change="onConfigChange"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
import {
  SCHEDULE_SET_TIME,
  SCHEDULE_SET_RANGE,
  PROJECT_GET_LIST,
} from "../../constants/actionTypes";

export default {
  name: "schedule-filter",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      options: [
        { label: "3 Tháng", value: 3 },
        { label: "6 Tháng", value: 6 },
        { label: "9 Tháng", value: 9 },
        { label: "12 Tháng", value: 12 },
      ],
    };
  },
  computed: {
    ...mapGetters("config", ["getConfig"]),
    firstTime: {
      get() {
        return this.getConfig?.firstTime;
      },
      set(date) {
        this.$store.dispatch(`config/${SCHEDULE_SET_TIME}`, {
          firstTime: date ? moment(date).format("YYYY-MM-DD") : "",
        });
      },
    },
    range: {
      get() {
        return this.getConfig?.range;
      },
      set(value) {
        this.$store.dispatch(`config/${SCHEDULE_SET_RANGE}`, {
          range: value,
        });
      },
    },
  },
  methods: {
    onConfigChange() {
      this.$store.dispatch(`project/${PROJECT_GET_LIST}`);
    },
  },
};
</script>
<style scoped>
</style>
