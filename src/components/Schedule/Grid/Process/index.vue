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
      class="item"
      effect="light"
      content="Thông tin dự án"
      placement="top"
    >
      <Project :style="projectStyle" :project="project" />
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
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
    ...mapGetters("config", ["getConfig"]),
    processStyle() {
      const { width, height } = this.getConfig;

      return {
        gridTemplateColumns: `repeat(${this.cells.length}, ${width}px)`,
        gridTemplateRows: `repeat(1, ${height}px)`,
        width: `${width * this.cells.length}px`,
      };
    },
    projectStyle() {
      const firstTime = moment(this.getConfig?.firstTime, "YYYY-MM-DD");
      const timeStart = moment(this.project?.timeStart, "YYYY-MM-DD");
      const timeEnd = moment(this.project?.timeEnd, "YYYY-MM-DD");

      const start = firstTime.isBefore(timeStart)
        ? timeStart.diff(firstTime, "days") + 1
        : 1;
      let end = firstTime.isBefore(timeEnd)
        ? timeEnd.diff(firstTime, "days") + 1
        : 1;
      let gridTemplateColumns = "100%";

      if (this.project?.status === "Kết thúc") {
        const { guarantee = 0 } = this.project;
        const timeGuarantee = moment(timeEnd, "YYYY-MM-DD").add(
          guarantee,
          "days"
        );
        end = firstTime.isBefore(timeGuarantee)
          ? timeGuarantee.diff(firstTime, "days") + 1
          : 1;

        const devDays = timeEnd.diff(timeStart, "days") + 1;
        const percentDevTime = (devDays / (devDays + guarantee)) * 100; // ex: 25.5

        gridTemplateColumns = `${percentDevTime}% ${100 - percentDevTime}%`;
      }

      return {
        gridColumn: `${start} / ${end}`,
        gridRow: "1 / 2",
        display: "grid",
        gridTemplateColumns,
      };
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
