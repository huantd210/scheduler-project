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
        cls = "bg-gray-300";
      }

      return cls;
    },
  },
};
</script>

<style scoped>
.process__cell--empty {
  height: 100%;
}

.process__cell--border {
  height: 100%;
  border-bottom: 1px solid #8395a769;
  border-left: 1px solid #8395a769;
}
</style>
