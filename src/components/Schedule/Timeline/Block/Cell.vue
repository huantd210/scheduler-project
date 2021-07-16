<template>
  <div class="timeline-block__cell overflow-hidden">
    <div class="cell-day text-sm" :class="cellClass">
      {{ cell.date.date() }}
    </div>
    <div class="cell-th text-sm" :class="cellClass">
      {{ getDayInWeek === 7 ? "CN" : `T${getDayInWeek + 1}` }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { isHoliday } from "../../../../utils";

export default {
  name: "timeline-block-cell",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cellClass() {
      let cls = "bg-blue-600 process__cell--border";

      // T7 or CN
      if (
        this.getDayInWeek === 6 ||
        this.getDayInWeek === 7 ||
        isHoliday(this.cell.date)
      ) {
        cls = "bg-gray-300";
      }

      return cls;
    },
    getDayInWeek() {
      return moment(this.cell.date).isoWeekday();
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
