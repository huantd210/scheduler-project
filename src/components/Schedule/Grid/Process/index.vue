<template>
  <div class="grid-process" :style="processStyle">
    <CellEmpty
      v-for="index in getEmptyCells"
      :key="`de-${index}`"
      :style="getEmptyCellPosition({ x: index, y: index + 1 }, { x: 1, y: 2 })"
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
import moment from "moment";
import { getDaysInYear } from "../../../../utils";
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
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  computed: {
    processStyle() {
      return {
        gridTemplateColumns: `repeat(${this.getEmptyCells}, ${this.width}px)`,
        gridTemplateRows: `repeat(1, ${this.height}px)`,
        width: `${this.width * this.getEmptyCells}px`,
      };
    },
    projectStyle() {
      const { timeStart, timeEnd } = this.project;

      const start = moment(timeStart, "YYYY-MM-DD").dayOfYear();
      const end = moment(timeEnd, "YYYY-MM-DD").dayOfYear() + 1;

      return {
        gridColumn: `${start} / ${end}`,
        gridRow: "1 / 2",
      };
    },
    guaranteeStyle() {
      const { timeEnd, guarantee } = this.project;
      if (!guarantee) return;

      const timeGuarantee = moment(timeEnd, "YYYY-MM-DD").add(
        guarantee,
        "days"
      );
      const start = moment(timeEnd, "YYYY-MM-DD").dayOfYear();
      const end = moment(timeGuarantee, "YYYY-MM-DD").dayOfYear() + 1;

      return {
        gridColumn: `${start} / ${end}`,
        gridRow: "1 / 2",
      };
    },
    getEmptyCells() {
      return getDaysInYear(2021);
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
  height: 100%;
  background-color: #fff;
  border-bottom: 1px solid #8395a7;
  border-right: 1px solid #8395a7;
  display: grid;
  grid-row: 1 / 2;
  align-items: center;
}
</style>
