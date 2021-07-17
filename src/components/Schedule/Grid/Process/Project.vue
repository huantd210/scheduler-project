<template>
  <div
    class="
      process__project
      text-xs
      bg-transparent
      cursor-pointer
      overflow-hidden
    "
  >
    <div :style="devColor" class="process__project--dev"></div>
    <div
      v-if="visiableMainte"
      :style="mainteColor"
      class="process__project--mainte"
    ></div>
  </div>
</template>

<script>
import { COLORS, PROJECT_STATUS } from "../../../../constants";

export default {
  name: "process-project",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    devColor() {
      let projectColor = COLORS.started;
      switch (this.project.status) {
        case PROJECT_STATUS.negotiate: // "Đàm phán"
          projectColor = COLORS.negotiate;
          break;

        case PROJECT_STATUS.notStartedYet: // "Chưa bắt đầu"
          projectColor = COLORS.notStartedYet;
          break;

        case PROJECT_STATUS.finished: // "Kết thúc"
          projectColor = COLORS.finished;
          break;

        default:
          break;
      }

      return { backgroundColor: projectColor };
    },
    mainteColor() {
      return { backgroundColor: COLORS.maintenance };
    },
    visiableMainte() {
      return this.project.status === PROJECT_STATUS.finished;
    },
  },
};
</script>

<style scoped>
.process__project {
  width: 100%;
  height: 100%;
  display: grid;
}

.process__project--dev,
.process__project--mainte {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.process__project--dev {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.process__project--mainte {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
</style>
