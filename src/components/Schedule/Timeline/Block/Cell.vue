<template>
  <div class="timeline-block__cell overflow-hidden">
    <div class="cell-day text-sm">{{ cell.day }}</div>
    <div class="cell-th text-sm">{{ getCellTh }}</div>
  </div>
</template>

<script>
export default {
  name: "timeline-block-cell",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getCellTh() {
      return this.cell.th === 7 ? "CN" : `T${this.cell.th + 1}`;
    },
  },
};
</script>

<style scoped>
.timeline-block__cell {
  height: 100%;
  border-left: 1px solid #8395a769;
  display: grid;
  grid-auto-rows: 50% 50%;
}

.cell-day,
.cell-th {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell-day {
  grid-row: 1 / 2;
  border-bottom: 1px solid #8395a769;
}

.cell-th {
  grid-row: 2 / 3;
}
</style>
