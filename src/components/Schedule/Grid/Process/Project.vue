<template>
  <div
    class="
      process__project
      h-full
      flex
      justify-center
      items-center
      bg-transparent
      cursor-pointer
      text-sm
      overflow-hidden
    "
    :style="projectColor"
  >
    <span> {{ project.name }}</span>
  </div>
</template>

<script>
import { COLORS } from "../../../../constants";

export default {
  name: "process-project",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    projectColor() {
      let projectColor = COLORS.development;
      switch (this.project.status) {
        case "Đàm phán":
          projectColor = COLORS.negotiate;
          break;

        case "Đã đàm phán": // "Chưa bắt đầu"
          projectColor = COLORS.notStartedYet;
          break;

        case "Kết thúc":
          projectColor = COLORS.finish;
          break;

        default:
          break;
      }

      return { backgroundColor: projectColor };
    },
  },
};
</script>

<style scoped>
.process__project {
  width: 100%;
  height: 100%;
}
</style>
