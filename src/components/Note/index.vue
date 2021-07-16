<template>
  <div class="note inline-flex space-x-4">
    <div
      class="inline-flex space-x-1 justify-center items-center"
      v-for="(item, index) in notes"
      :key="`nt-${index}`"
    >
      <div class="square-color" :style="{ backgroundColor: item.color }"></div>
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { COLORS } from "../../constants";

export default {
  name: "note",
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
