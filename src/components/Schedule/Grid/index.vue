<template>
  <div class="schedule-gird">
    <Process
      v-for="(item, index) in projects"
      :key="`pr-${index}`"
      :project="item"
      :cells="getEmptyCells"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import { PROJECT_GET_LIST } from "../../../constants/actionTypes";
import { PROJECT_STATUS } from "../../../constants";
import { isProjectInRangeTime } from "../../../utils";
import Process from "./Process/index.vue";

export default {
  name: "schedule-gird",
  components: {
    Process,
  },
  computed: {
    ...mapState(["config"]),
    ...mapGetters("project", ["getProjects"]),
    ...mapGetters("config", ["getFirstTime", "getLastTime"]),
    getEmptyCells() {
      const { range } = this.config;
      const firstTime = moment(this.config?.firstTime, "YYYY-MM-DD");
      const lastTime = moment(
        moment(firstTime)
          .add(range - 1, "months")
          .endOf("month")
          .format("YYYY-MM-DD")
      );
      const daysRange = lastTime.diff(firstTime, "day");
      let cells = [];

      for (let i = 0; i <= daysRange; i++) {
        const date = moment(
          moment(firstTime).add(i, "days").format("YYYY-MM-DD")
        );

        cells.push({ date });
      }

      return cells;
    },
    visiableGrid() {
      return this.getProjects && this.getProjects.length > 0;
    },
    projects() {
      const firstTime = this.getFirstTime;
      const lastTime = this.getLastTime;

      return this.getProjects.map((project) => {
        project.isProjectInRangeTime = false;
        project.isFinished = false;

        if (isProjectInRangeTime(project, firstTime, lastTime)) {
          project.isProjectInRangeTime = true;
        }

        if (project?.status === PROJECT_STATUS.finished) {
          project.isFinished = true;
        }

        return project;
      });
    },
  },
  created() {
    this.$store.dispatch(`project/${PROJECT_GET_LIST}`);
  },
};
</script>

<style scoped>
.schedule-gird {
  height: 100%;
  width: 100%;
  grid-row: 2 / 3;
  overflow: hidden;
  overflow-y: scroll;
  /* overscroll-behavior: contain; */
}
</style>
