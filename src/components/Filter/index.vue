<template>
  <div class="schedule-filter flex space-x-2">
    <el-date-picker
      style="max-width: 160px"
      v-model="firstTime"
      type="date"
      placeholder="Ngày bắt đầu"
      size="small"
      format="dd/MM/yyyy"
      @change="onConfigChange"
    >
    </el-date-picker>
    <el-select
      style="max-width: 120px"
      v-model="range"
      placeholder="Phạm vi"
      size="small"
      clearable
      allow-create
      filterable
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
import { mapState } from "vuex";
import {
  SCHEDULE_SET_TIME,
  SCHEDULE_SET_RANGE,
  PROJECT_GET_LIST,
} from "../../constants/actionTypes";

export default {
  name: "schedule-filter",
  data() {
    return {
      options: [
        { label: "3 Tháng", value: 3 },
        { label: "6 Tháng", value: 6 },
        { label: "9 Tháng", value: 9 },
        { label: "12 Tháng", value: 12 },
      ],
    };
  },
  computed: {
    ...mapState(["config"]),
    firstTime: {
      get() {
        return this.config?.firstTime;
      },
      set(date) {
        this.$store.dispatch(`config/${SCHEDULE_SET_TIME}`, {
          firstTime: date ? moment(date).format("YYYY-MM-DD") : "",
        });
      },
    },
    range: {
      get() {
        return this.config?.range;
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
