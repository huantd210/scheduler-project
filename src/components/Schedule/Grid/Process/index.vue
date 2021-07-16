<template>
  <div class="grid-process" :style="processStyle">
    <CellEmpty
      v-for="(item, index) in cells"
      :key="`de-${index}`"
      :cell="item"
      :style="
        getEmptyCellPosition({ x: index + 1, y: index + 2 }, { x: 1, y: 2 })
      "
    />
    <el-tooltip
      effect="light"
      content="Thông tin dự án"
      placement="right-start"
      :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
    >
      <Project :style="projectStyle" :project="project" />
    </el-tooltip>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { PROJECT_STATUS } from "../../../../constants";
import CellEmpty from "./Cell";
import Project from "./Project";

export default {
  name: "grid-process",
  components: {
    CellEmpty,
    Project,
  },
  props: {
    project: {
      type: Object,
      required: true,
    },
    cells: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters("config", ["getConfig", "getFirstTime", "getLastTime"]),
    processStyle() {
      const { width, height } = this.getConfig;

      return {
        gridTemplateColumns: `repeat(${this.cells.length}, ${width}px)`,
        gridTemplateRows: `repeat(1, ${height}px)`,
        width: `${width * this.cells.length}px`,
      };
    },
    projectStyle() {
      const { width } = this.getConfig;
      const firstTime = this.getFirstTime;
      const timeEndProject = moment(this.project?.timeEnd, "YYYY-MM-DD");
      const start = this.timeStartBorder.diff(firstTime, "days") + 1; // ? -> grid
      const end = this.timeEndBorder.diff(firstTime, "days") + 2; // ? -> grid

      const rangeProject = end - start; // including maintenance time if any // unit day
      let gtColStyle = `${rangeProject * width}px 0px`; // default

      // visiable maintenance
      if (
        this.project.status === PROJECT_STATUS.finished &&
        timeEndProject.isBefore(this.timeEndBorder)
      ) {
        const rangeMainteProject = this.timeEndBorder.diff(
          timeEndProject,
          "days"
        );
        gtColStyle = `${(rangeProject - rangeMainteProject) * width}px ${
          rangeMainteProject * width
        }px`;
      }

      return {
        gridColumn: `${start} / ${end}`,
        gridRow: "1 / 2",
        width: `${width * rangeProject}px`,
        gridTemplateColumns: gtColStyle,
      };
    },
    timeStartBorder() {
      const firstTime = this.getFirstTime;
      const timeStartProject = moment(this.project?.timeStart, "YYYY-MM-DD");

      return timeStartProject.isBefore(firstTime)
        ? firstTime
        : timeStartProject;
    },
    timeEndBorder() {
      /* including maintenance time if any */
      const lastTime = this.getLastTime;
      const timeEndProject = moment(this.project?.timeEnd, "YYYY-MM-DD");

      if (timeEndProject.isAfter(lastTime)) return lastTime;
      if (this.project?.status !== PROJECT_STATUS.finished /* not "Kết thúc" */)
        return timeEndProject.isAfter(lastTime) ? lastTime : timeEndProject;

      const timeMaintenanceProject = moment(timeEndProject).add(
        this.project?.guarantee,
        "days"
      );

      if (timeMaintenanceProject.isAfter(lastTime)) return lastTime;

      return timeMaintenanceProject;
    },
  },
  methods: {
    getEmptyCellPosition(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }) {
      return {
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
      };
    },
  },
};
</script>

<style scoped>
.grid-process {
  background-color: #fff;
  /* border-bottom: 1px solid #8395a769; */
  border-right: 1px solid #8395a769;
  display: grid;
  grid-row: 1 / 2;
  align-items: center;
}
</style>

