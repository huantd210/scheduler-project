<template>
  <el-popover
    ref="prPopover"
    placement="left"
    trigger="hover"
    :popper-options="{
      boundariesElement: 'viewport',
      removeOnDestroy: true,
    }"
    :open-delay="200"
    :close-delay="0"
    @show="onPopperShow"
  >
    <div class="space-y-2" style="top: 0">
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
        <strong> {{ timeEndExactProjectFormat }} </strong>
      </span>
      <span v-if="project.isFinished" class="block">
        Hạn bảo trì:
        <strong>
          {{ timeEndProjectFormat }}
        </strong>
      </span>
    </div>

    <!-- process -->
    <div
      slot="reference"
      :class="[
        project.isProjectInRangeTime ? 'bg-white' : 'bg-gray-100',
        'grid-process',
      ]"
      :style="processStyle"
      @dblclick="onSelectProject"
    >
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
  </el-popover>
</template>

<script>
import moment from "moment";
import { mapState, mapGetters } from "vuex";
import { PROJECT_SELECTED } from "../../../../constants/actionTypes";
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
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
    };
  },
  computed: {
    ...mapState(["config"]),
    ...mapGetters("config", ["getFirstTime", "getLastTime"]),
    processStyle() {
      const { width, height } = this.config;

      return {
        gridTemplateColumns: `repeat(${this.cells.length}, ${width}px)`,
        gridTemplateRows: `repeat(1, ${height}px)`,
        width: `${width * this.cells.length}px`,
      };
    },
    projectStyle() {
      const firstTime = this.getFirstTime;

      // ignore (unvisible) projects not in range time
      if (!this.project?.isProjectInRangeTime)
        return {
          gridRow: "1 / 2",
          width: 0,
          gridTemplateColumns: "0px 0px",
          display: "none",
        };

      const { width } = this.config;
      const start = this.timeStartBorder.diff(firstTime, "days") + 1; // ? -> grid
      const end = this.timeEndBorder.diff(firstTime, "days") + 2; // ? -> grid

      const rangeProject = end - start; // unit day & including maintenance time if any
      let gridColStyle = `${rangeProject * width}px 0px`; // default

      // visiable maintenance
      if (this.project?.isFinished) {
        gridColStyle =
          rangeProject - this.project?.maintenance > 0
            ? `${(rangeProject - this.project?.maintenance) * width}px 
            ${this.project?.maintenance * width}px`
            : `0px ${this.project?.maintenance * width}px`;
      }

      return {
        gridColumn: `${start} / ${end}`,
        gridRow: "1 / 2",
        width: `${width * rangeProject}px`,
        gridTemplateColumns: gridColStyle,
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
      const lastTime = this.getLastTime;
      let timeEndProject = moment(this.project?.timeEnd, "YYYY-MM-DD"); // including maintenance time if any (*)

      if (this.project?.isFinished) {
        timeEndProject = moment(this.project?.timeEnd, "YYYY-MM-DD").add(
          this.project?.maintenance,
          "days"
        ); // (*)
      }
      return timeEndProject.isAfter(lastTime) ? lastTime : timeEndProject;
    },
    timeStartProjectFormat() {
      return moment(this.project.timeStart).format("DD/MM/YYYY");
    },
    timeEndExactProjectFormat() {
      return moment(this.project.timeEnd).format("DD/MM/YYYY");
    },
    timeEndProjectFormat() {
      // including maintenance time if any
      return moment(this.project?.timeEnd, "YYYY-MM-DD")
        .add(this.project?.maintenance, "days")
        .format("DD/MM/YYYY");
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
    onPopperShow() {
      this.$nextTick(() => {
        const prPopperElm = this.$refs.prPopover.popperElm;
        prPopperElm.style.transform += `translateX(${
          this.mouseX - prPopperElm.offsetWidth
        }px)`;

        this.$refs.prPopover.doShow();
      });
    },
    mouseEnter(event) {
      this.mouseX = event?.pageX;
      this.mouseY = event?.pageY;
    },
  },
  mounted() {
    this.$refs.prPopover.$el.addEventListener("mouseenter", this.mouseEnter);
  },
  beforeDestroy() {
    this.$refs.prPopover.$el.removeEventListener("mouseenter", this.mouseEnter);
  },
};
</script>

<style scoped>
.grid-process {
  border-bottom: 1px solid #222f3e4a;
  /* border-right: 1px solid #fff; */
  display: grid;
  grid-row: 1 / 2;
  align-items: center;
}
</style>

