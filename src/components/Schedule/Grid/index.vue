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
import { mapGetters, mapState } from "vuex";
import moment from "moment";
import { PROJECT_GET_LIST } from "../../../constants/actionTypes";
import Process from "./Process/index.vue";

export default {
  name: "schedule-gird",
  components: {
    Process,
  },
  computed: {
    ...mapState(["config"]),
    ...mapGetters("project", ["getProjects"]),
    getEmptyCells() {
      const { range } = this.config;
      const firstTime = moment(this.config?.firstTime, "YYYY-MM-DD");
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
    visiableGrid() {
      return this.getProjects && this.getProjects.length > 0;
    },
  },
  created() {
    this.$store.dispatch(`project/${PROJECT_GET_LIST}`);
  },
};
</script>

<style scoped>
.schedule-gird {
  height: 100%;
  width: 100%;
  grid-row: 2 / 3;
  overflow: hidden;
  overflow-y: scroll;
  overscroll-behavior: contain;
}

.schedule-gird::-webkit-scrollbar {
  width: 5px;
}
</style>
