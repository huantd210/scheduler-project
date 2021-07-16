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
import moment from "moment";
import { mapGetters } from "vuex";
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
      const { range } = this.getConfig;
      const firstTime = moment(this.getConfig?.firstTime, "YYYY-MM-DD");
      const lastTime = moment(
        moment(firstTime)
          .add(range - 1, "months")
          .endOf("month")
          .format("YYYY-MM-DD")
      );
      const timeStartProject = moment(this.project?.timeStart, "YYYY-MM-DD");
      const timeEndProject = moment(this.project?.timeEnd, "YYYY-MM-DD");

      const timeStartBorder = timeStartProject.isBefore(firstTime)
        ? firstTime
        : timeEndProject;
      const timeEndBorder = timeEndProject.isAfter(lastTime)
        ? lastTime
        : timeEndProject;

      const start = timeStartBorder.diff(firstTime, "days") + 1; // ? -> grid
      const end = timeEndBorder.diff(firstTime, "days") + 2; // ? -> grid

      return {
        gridColumn: `${start} / ${end}`,
        gridRow: "1 / 2",
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


//  let rangeProject = timeEndBorder.diff(timeStartBorder, "days") + 1;

//       if (this.project?.status === "Kết thúc") {
//         const { guarantee } = this.project;
//         let timeGuarantee = moment(timeEnd, "YYYY-MM-DD").add(
//           guarantee,
//           "days"
//         );

//         const timeGuaranteeBorder = timeGuarantee.isAfter(lastTime)
//           ? lastTime
//           : timeGuarantee;

//         const endDev = end;
//         end = timeGuaranteeBorder.diff(firstTime, "days") + 2;
//         rangeProject += range;

//         // eslint-disable-next-line vue/no-side-effects-in-computed-properties
//         this.devStyle = {
//           gridColumn: `${start} / ${endDev}`,
//           gridRow: "1 / 2",
//         };

//         // eslint-disable-next-line vue/no-side-effects-in-computed-properties
//         this.guarStyle = {
//           gridColumn: `${endDev + 1} / ${end}`,
//           gridRow: "1 / 2",
//         };
//       }
