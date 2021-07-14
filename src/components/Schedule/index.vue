<template>
  <div>
    <Timeline ref="scheduleTimeline" :start="start" :end="end" :width="width" />
    <Grid ref="scheduleGrid" :width="width" :height="height" />
  </div>
</template>
<script>
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
      width: 25,
      height: 45, // default
    };
  },
};
</script>
<style scoped>
</style>