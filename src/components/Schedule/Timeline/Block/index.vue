<template>
  <div class="timeline-block">
    <div
      class="
        timeline-block__month
        flex
        justify-center
        items-center
        overflow-hidden
      "
    >
      <span>Tháng {{ block.month }}</span>
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
    bottomBlockStyle() {
      return {
        gridTemplateColumns: `repeat(${this.block.cells.length})`,
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
  created() {
    console.log({ block: this.block });
  },
};
</script>

<style scoped>
.timeline-block {
  height: 100%;
  background-color: #feca57;
  border-left: 1px solid #8395a7;
  border-bottom: 1px solid #8395a7;
  display: grid;
  grid-auto-rows: 35% 65%;
}

.timeline-block__month {
  grid-row: 1 / 2;
}

.timeline-block__day {
  grid-row: 2 / 3;
  display: grid;
}
</style>
