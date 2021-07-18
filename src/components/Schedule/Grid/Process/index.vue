<template>
  <el-tooltip
    effect="light"
    placement="right-start"
    :popper-options="{ boundariesElement: 'viewport', removeOnDestroy: true }"
  >
    <div slot="content" class="space-y-2">
      <span class="block">
        Tên dự án:
        <strong> {{ project.name }} </strong>
      </span>
      <span class="block">
        Trạng thái:
        <strong> {{ project.status }} </strong>
      </span>
      <span class="block">
        Ngày bắt đầu:
        <strong>
          {{ timeStartProjectFormat }}
        </strong>
      </span>
      <span class="block">
        Ngày kết thúc:
        <strong> {{ timeEndProjectFormat }} </strong>
      </span>
    </div>
    <div class="grid-process" :style="processStyle" @dblclick="onSelectProject">
      <CellEmpty
        v-for="(item, index) in cells"
        :key="`de-${index}`"
        :cell="item"
        :style="
          getEmptyCellPosition({ x: index + 1, y: index + 2 }, { x: 1, y: 2 })
        "
      />

      <Project :style="projectStyle" :project="project" />
    </div>
  </el-tooltip>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { PROJECT_SELECTED } from "../../../../constants/actionTypes";
import { PROJECT_STATUS } from "../../../../constants";
import { isProjectInRangeTime } from "../../../../utils";
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
      const firstTime = this.getFirstTime;
      const lastTime = this.getLastTime;

      if (!isProjectInRangeTime(this.project, firstTime, lastTime))
        return {
          gridColumn: "1 / 1",
          gridRow: "1 / 2",
          width: 0,
          gridTemplateColumns: "0px 0px",
        };

      const { width } = this.getConfig;
      const timeEndProject = moment(this.project?.timeEnd, "YYYY-MM-DD");

      const diffStart = this.timeStartBorder.diff(firstTime, "days");
      const diffEnd = this.timeEndBorder.diff(firstTime, "days");
      const start = diffStart < 0 ? 0 : diffStart + 1; // ? -> grid
      const end = diffEnd < 0 ? 0 : diffEnd + 2; // ? -> grid

      const rangeProject = end - start > 0 ? end - start : 0; // including maintenance time if any // unit day
      let gtColStyle = `${rangeProject * width}px 0px`; // default

      // visiable maintenance
      if (
        this.project.status === PROJECT_STATUS.finished &&
        timeEndProject.isBefore(this.timeEndBorder)
      ) {
        gtColStyle =
          rangeProject <= 0
            ? "0px 0px"
            : rangeProject - this.project?.guarantee > 0
            ? `${(rangeProject - this.project?.guarantee) * width}px ${
                this.project?.guarantee * width
              }px`
            : `0px ${this.project?.guarantee * width}px`;
      }

      // console.log({
      //   id: this.project.id,
      //   rangeProject,
      //   gtColStyle,
      //   firstTime: firstTime.format("YYYY-MM-DD"),
      //   timeStartBorder: this.timeStartBorder.format("YYYY-MM-DD"),
      //   timeEndBorder: this.timeEndBorder.format("YYYY-MM-DD"),
      //   start,
      //   diffStart,
      //   diffEnd,
      //   end,
      // });

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
    timeStartProjectFormat() {
      return moment(this.project.timeStart).format("DD/MM/YYYY");
    },
    timeEndProjectFormat() {
      return moment(this.project.timeEnd).format("DD/MM/YYYY");
    },
  },
  methods: {
    getEmptyCellPosition(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }) {
      return {
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
      };
    },
    onSelectProject() {
      this.$store.dispatch(`project/${PROJECT_SELECTED}`, {
        project: {
          ...this.project,
        },
      });
    },
  },
};
</script>

<style scoped>
.grid-process {
  background-color: #d1ccc0;
  border-bottom: 1px solid #222f3e4a;
  /* border-right: 1px solid #fff; */
  display: grid;
  grid-row: 1 / 2;
  align-items: center;
}
</style>

