<template>
  <div class="process__cell--empty overflow-hidden" :class="cellClass"></div>
</template>

<script>
import { isHoliday } from "../../../../utils";

export default {
  name: "process-cell-empty",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cellClass() {
      let cls = "bg-transparent process__cell--border";
      const diw = this.cell?.date.isoWeekday();

      // T7 or CN
      if (diw === 6 || diw === 7 || isHoliday(this.cell.date)) {
        cls = "process__cell--gray";
      }

      return cls;
    },
  },
};
</script>

<style scoped>
.process__cell--empty {
  background-color: #fff;
  height: 100%;
  width: 100%;
}

.process__cell--gray {
  background-color: #d1ccc0;
  height: 100%;
  width: 100%;
}
</style>
