<template>
  <div class="schedule-note">
    <div
      class="inline-flex space-x-1.5 px-3 justify-center items-center"
      v-for="(item, index) in notes"
      :key="`nt-${index}`"
    >
      <el-color-picker
        size="mini"
        :value="item.color"
        @change="onColorChange($event, item.key)"
      ></el-color-picker>
      <div class="text-sm">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { SCHEDULE_SET_COLOR } from "../../constants/actionTypes";

export default {
  name: "schedule-note",
  computed: {
    ...mapState(["config"]),
    notes() {
      return [
        {
          key: "negotiate",
          name: "Đàm phán",
          color: this.config?.colors?.negotiate,
        },
        {
          key: "notStarted",
          name: "Chưa bắt đầu",
          color: this.config?.colors?.notStarted,
        },
        {
          key: "started",
          name: "Bắt đầu",
          color: this.config?.colors?.started,
        },
        {
          key: "finished",
          name: "Kết thúc",
          color: this.config?.colors?.finished,
        },
        {
          key: "maintenance",
          name: "Bảo trì",
          color: this.config?.colors?.maintenance,
        },
      ];
    },
  },
  methods: {
    onColorChange(color, key) {
      this.$store.dispatch(`config/${SCHEDULE_SET_COLOR}`, {
        colors: {
          [key]: color,
        },
      });
    },
  },
};
</script>
<style scoped>
</style>
