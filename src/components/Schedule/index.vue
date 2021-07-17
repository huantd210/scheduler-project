<template>
  <div class="w-full h-full">
    <div v-if="visiableSchedule" class="schedule" :style="scheduleStyle">
      <Timeline ref="scheduleTimeline" />
      <Grid ref="scheduleGrid" />
    </div>
    <div v-else>
      <el-empty></el-empty>
    </div>
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
  computed: {
    ...mapGetters("config", ["getConfig"]),
    scheduleStyle() {
      const { height } = this.getConfig;

      return {
        gridTemplateRows: `${height * 3}px calc(100% - ${height * 3}px)`,
      };
    },
    visiableSchedule() {
      return this.getConfig?.firstTime && this.getConfig?.range;
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