<template>
  <div class="schedule" :style="scheduleStyle">
    <Timeline ref="scheduleTimeline" />
    <Grid ref="scheduleGrid" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Timeline from "./Timeline/index.vue";
import Grid from "./Grid/index.vue";

export default {
  name: "schedule",
  components: {
    Timeline,
    Grid,
  },
  data() {
    return {
      start: 1,
      end: 12, // 12 months
      // slice: 4, // 4 weeks
      width: 35,
      height: 35, // default
    };
  },
  computed: {
    ...mapGetters("config", ["getConfig"]),
    scheduleStyle() {
      const { height } = this.getConfig;

      return {
        gridTemplateRows: `${height * 3}px calc(100vh - ${height * 3}px)`,
      };
    },
  },
};
</script>
<style scoped>
.schedule {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-x: scroll;
  display: grid;
}
</style>