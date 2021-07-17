<template>
  <div class="schedule-note">
    <div
      class="inline-flex space-x-1 px-2 justify-center items-center"
      v-for="(item, index) in notes"
      :key="`nt-${index}`"
    >
      <div class="square-color" :style="{ backgroundColor: item.color }"></div>
      <div class="text-sm">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { COLORS } from "../../constants";

export default {
  name: "schedule-note",
  data() {
    return {
      notes: [
        {
          name: "Đàm phán",
          color: COLORS.negotiate,
        },
        {
          name: "Chưa bắt đầu",
          color: COLORS.notStartedYet,
        },
        {
          name: "Bắt đầu",
          color: COLORS.started,
        },
        {
          name: "Kết thúc",
          color: COLORS.finished,
        },
        {
          name: "Bảo trì",
          color: COLORS.maintenance,
        },
      ],
    };
  },
};
</script>
<style scoped>
.square-color {
  width: 15px;
  height: 15px;
}
</style>
