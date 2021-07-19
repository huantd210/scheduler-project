<template>
  <div class="schedule-timeline" :style="timelineStyle">
    <Block
      v-for="(item, index) in getBlocks"
      :key="item.id"
      :block="item"
      :style="
        blockStyle(
          { x: index + 1, y: index + 2 },
          { x: 1, y: 2 },
          item.cells.length
        )
      "
    ></Block>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Block from "./Block/index.vue";

export default {
  name: "schedule-timeline",
  components: {
    Block,
  },
  computed: {
    ...mapState(["config"]),
    getBlocks() {
      const { range } = this.config;

      const firstTime = moment(this.config?.firstTime, "YYYY-MM-DD");
      const startOfMonth = moment(
        moment(firstTime).startOf("month").format("YYYY-MM-DD")
      );
      let blocks = [];

      blocks.push({
        date: firstTime,
        cells: this.getCells(firstTime),
      }); // first

      for (let i = 1; i < range; i++) {
        const currentTime = moment(
          moment(startOfMonth).add(i, "months").format("YYYY-MM-DD")
        ); // next

        const item = {
          date: currentTime,
          cells: this.getCells(currentTime),
        };

        blocks.push(item);
      }

      return blocks;
    },
    timelineStyle() {
      const { range, height } = this.config;

      return {
        gridTemplateColumns: `repeat(
          ${range},
          auto
        )`,
        gridTemplateRows: `repeat(1, ${height * 3}px)`,
      };
    },
  },
  methods: {
    blockStyle(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }, cells) {
      const { width } = this.config;

      return {
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
        width: `${width * cells}px`,
      };
    },
    getCells(currentTime) {
      const day = currentTime.date(); // day start
      const month = currentTime.month() + 1;
      const year = currentTime.year();

      const dom = moment(`${year}-${month}`, "YYYY-MM").daysInMonth(); // days of month (last day in month)
      let cells = [];

      for (let i = day; i <= dom; i++) {
        const item = {
          date: moment(`${year}-${month}-${i}`, "YYYY-MM-DD"),
        };
        cells.push(item);
      }

      return cells;
    },
  },
};
</script>

<style scoped>
.schedule-timeline {
  height: 100%;
  width: 100%;
  grid-row: 1 / 2;
  display: grid;
}
</style>
