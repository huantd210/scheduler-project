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
import { mapGetters } from "vuex";
import moment from "moment";
import Block from "./Block/index.vue";

export default {
  name: "schedule-timeline",
  components: {
    Block,
  },
  computed: {
    ...mapGetters("config", ["getConfig"]),
    getBlocks() {
      const { start, end } = this.getConfig;
      let blocks = [];

      for (let i = start; i <= end; i++) {
        const item = {
          month: i,
          cells: this.getCells(i, 2021),
        };

        blocks.push(item);
      }
      return blocks;
    },
    timelineStyle() {
      const { start, end, height } = this.getConfig;

      return {
        gridTemplateColumns: `repeat(
          ${end - start + 1},
          auto
        )`,
        gridTemplateRows: `repeat(1, ${height * 3}px)`,
      };
    },
  },
  methods: {
    blockStyle(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }, cells) {
      const { width } = this.getConfig;

      return {
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
        width: `${width * cells}px`,
      };
    },
    getCells(month, year) {
      const dom = moment(`${year}-${month}`, "YYYY-MM").daysInMonth(); // days of month
      let cells = [];

      for (let i = 0; i < dom; i++) {
        const diw = moment(
          `${year}-${month}-${i + 1}`,
          "YYYY-MM-DD"
        ).isoWeekday(); // day in week

        const item = {
          day: i + 1,
          th: diw,
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
