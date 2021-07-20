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
      v-if="project.isFinished"
      :style="maintenanceColor"
      class="process__project--mainte"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { PROJECT_STATUS } from "../../../../constants";

export default {
  name: "process-project",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["config"]),
    devColor() {
      let projectColor;

      switch (this.project.status) {
        case PROJECT_STATUS.negotiate: // "Đàm phán"
          projectColor = this.config?.colors?.negotiate;
          break;

        case PROJECT_STATUS.not_started: // "Chưa bắt đầu"
          projectColor = this.config?.colors?.notStarted;
          break;

        case PROJECT_STATUS.started: // "Bắt đầu"
          projectColor = this.config?.colors?.started;
          break;

        case PROJECT_STATUS.finished: // "Kết thúc"
          projectColor = this.config?.colors?.finished;
          break;

        default:
          break;
      }

      return { backgroundColor: projectColor };
    },
    maintenanceColor() {
      return { backgroundColor: this.config?.colors?.maintenance };
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
