<template>
  <div class="schedule-gird">
    <Process
      v-for="(item, index) in getProjects"
      :key="`pr-${index}`"
      :project="item"
      :cells="getEmptyCells"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { PROJECT_GET_LIST } from "../../../constants/actionTypes";
import Process from "./Process/index.vue";

export default {
  name: "schedule-gird",
  components: {
    Process,
  },
  computed: {
    ...mapGetters("project", ["getProjects"]),
    ...mapGetters("config", ["getConfig"]),
    getEmptyCells() {
      const { range } = this.getConfig;
      const firstTime = moment(this.getConfig?.firstTime, "YYYY-MM-DD");
      const lastTime = moment(
        moment(firstTime)
          .add(range - 1, "months")
          .endOf("month")
          .format("YYYY-MM-DD")
      );
      const daysRange = lastTime.diff(firstTime, "day");
      let cells = [];

      for (let i = 0; i <= daysRange; i++) {
        const date = moment(
          moment(firstTime).add(i, "days").format("YYYY-MM-DD")
        );

        cells.push({ date });
      }

      return cells;
    },
  },
  async created() {
    try {
      await this.$store.dispatch(`project/${PROJECT_GET_LIST}`);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.schedule-gird {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  grid-row: 2 / 3;
}
</style>
