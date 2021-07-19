<template>
  <div class="timeline-block" :style="blockStyle">
    <div
      class="
        timeline-block__month
        bg-blue-600
        text-xs
        flex
        justify-center
        items-center
        overflow-hidden
      "
    >
      <span class="text-white"
        >{{ block.date.month() + 1 }}/{{ block.date.year() }}
      </span>
    </div>
    <div class="timeline-block__day" :style="bottomBlockStyle">
      <Cell
        v-for="(item, index) in block.cells"
        :key="`d-${index}`"
        :cell="item"
        :style="getCellPosition({ x: index + 1, y: index + 2 }, { x: 1, y: 2 })"
      >
      </Cell>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cell from "./Cell";

export default {
  name: "gantt-calendar-item-grid",
  components: {
    Cell,
  },
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["config"]),
    blockStyle() {
      const { height } = this.config;

      return {
        gridTemplateRows: `${height}px ${height * 2}px`,
      };
    },
    bottomBlockStyle() {
      const { width } = this.config;

      return {
        gridTemplateColumns: `repeat(${this.block.cells.length}, ${width}px)`,
      };
    },
  },
  methods: {
    getCellPosition(column = { x: 1, y: 2 }, row = { x: 1, y: 2 }) {
      return {
        gridColumn: `${column.x} / ${column.y}`,
        gridRow: `${row.x} / ${row.y}`,
      };
    },
  },
};
</script>

<style scoped>
.timeline-block {
  height: 100%;
  width: 100%;
  /* border-bottom: 1px solid #fff; */
  border-left: 1px solid #d1ccc0;
  display: grid;
}

.timeline-block:first-child {
  border-left-width: 0;
}

.timeline-block:first-child > .timeline-block__month {
  border-left-width: 0;
}

.timeline-block__month {
  border-bottom: 1px solid #d1ccc0;
  height: 100%;
  width: 100%;
  grid-row: 1 / 2;
}

.timeline-block__day {
  /* border-left: 1px solid #d1ccc0; */
  grid-row: 2 / 3;
  display: grid;
}

.timeline-block:first-child > .timeline-block__day {
  border-left-width: 0;
}
</style>
