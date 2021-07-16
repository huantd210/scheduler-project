<template>
  <div class="schedule-timeline" :style="timelineStyle">
    <Block
      v-for="(item, index) in getBlocks"
      :key="item.id"
      :width="width"
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
import moment from "moment";
import Block from "./Block/index.vue";

export default {
  name: "schedule-timeline",
  components: {
    Block,
  },
  props: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      height: 120,
    };
  },
  computed: {
    getBlocks() {
      let blocks = [];

      for (let i = this.start; i <= this.end; i++) {
        const item = {
          month: i,
          cells: this.getCells(i, 2021),
        };

        blocks.push(item);
      }
      return blocks;
    },
    timelineStyle() {
      return {
        gridTemplateColumns: `repeat(
          ${this.end - this.start + 1},
          auto
        )`,
        gridTemplateRows: `repeat(1, ${this.height}px)`,
      };
    },
  },
  methods: {
    blockStyle(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }, cells) {
      return {
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
        width: `${this.width * cells}px`,
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
